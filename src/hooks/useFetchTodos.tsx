import { db } from "@/firebase/config";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import type TodoI from "@/interfaces/TodoI";

export default function useFetchTodos(todosCollection: string, uid?: string) {
  const [todos, setTodos] = useState<TodoI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const loadData = async function () {
      if (cancel) {
        return;
      }
      setLoading(true);
      setError(false);

      try {
        const collectionRef = await collection(db, todosCollection);
        let q;
        if (uid) {
          q = await query(collectionRef, where("uid", "==", uid));
        } else {
          q = await query(collectionRef);
        }

        await onSnapshot<TodoI>(q, (querySnap) => {
          setTodos(
            querySnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
        setError(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };

    loadData();
  }, [todosCollection, uid, cancel]);

  useEffect(() => {
    () => setCancel(true);
  }, []);

  return { todos, loading, error };
}
