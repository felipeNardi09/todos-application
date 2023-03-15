import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { type NewTodoI } from "@/interfaces/TodoI";

export const useAddTodo = function (todosCollection: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cancel, setCancel] = useState(false);

  const checkIfDone = () => {
    if (cancel) return;
  };

  const addTodo = async function (inputValues: NewTodoI) {
    checkIfDone();

    setLoading(true);
    setError(false);
    try {
      const createdTodo = await addDoc(
        collection(db, todosCollection),
        inputValues
      );

      setLoading(false);
      setError(false);
      return createdTodo;
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    return () => setCancel(true);
  }, []);

  return { addTodo, error, loading };
};
