import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default function useDeleteTodo(todosCollection: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cancel, setCancel] = useState(false);

  const checkIfDone = () => {
    if (cancel) return;
  };

  const deleteTodo = async function (id: string) {
    checkIfDone();

    setLoading(true);
    setError(false);
    try {
      const deletedTodo = await deleteDoc(doc(db, todosCollection, id));

      setLoading(false);
      setError(false);
      return deletedTodo;
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    return () => setCancel(true);
  }, []);

  return { deleteTodo, error, loading };
}
