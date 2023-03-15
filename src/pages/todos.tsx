import { useAuthentication } from "@/hooks/useAuthentication";
import { type FormEvent, useState, type ChangeEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthValue } from "@/context/AuthContext";
import { useAddTodo } from "@/hooks/useAddTodo";
import useFetchTodos from "@/hooks/useFetchTodos";
import { Timestamp } from "firebase/firestore";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Todos() {
  const user = useAuthValue();

  const { logOut, loading: logOutLoading } = useAuthentication();
  const { addTodo, loading: addLoading } = useAddTodo("todos");
  const { todos } = useFetchTodos("todos", user?.uid);
  const { deleteTodo } = useDeleteTodo("todos");
  const router = useRouter();

  const handleLogOut = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    await logOut();
    router.push("/");
  };

  const [formValue, setFormValue] = useState({
    list: "",
    tasks: "",
  });

  const handleAddTodo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { list, tasks } = formValue;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (list === "" || tasks === "") return;

    const displayTasks = tasks.split(",");

    addTodo({
      list,
      displayTasks,
      createdAt: Timestamp.now(),
      uid: user?.uid,
    });

    setFormValue({
      list: "",
      tasks: "",
    });
  };

  return (
    <>
      {user ? (
        <div className="flex w-full flex-col items-center">
          <form className="flex w-4/5 flex-col" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="list"
              placeHolder="New list"
              onChange={handleAddTodo}
              classes="p-2 text-center my-2 rounded border border-black"
              value={list}
            />
            <Input
              type="text"
              name="tasks"
              placeHolder="Add your tasks to the list(separated by comma)"
              onChange={handleAddTodo}
              classes="p-2 text-center my-2 rounded border border-black"
              value={tasks}
            />
            {addLoading ? (
              <Button
                btnName="Creating task's list"
                disabled
                classes="bg-gray-300 duration-200 placeholder-gray-700 p-2 rounded text-center  text-xl "
              />
            ) : (
              <Button
                btnName="Create task's list"
                type="submit"
                classes="hover:bg-lime-200 bg-blue-300 duration-200 placeholder-gray-700 p-2 rounded text-center  text-xl"
              />
            )}
          </form>
          <div className="m-4 grid grid-cols-4 justify-items-stretch text-lg">
            {todos &&
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="m-2 flex flex-col items-center justify-between rounded border border-black p-6"
                >
                  <div className="p-2 text-center text-xl font-medium">
                    <h2>{todo.list}</h2>
                  </div>
                  {todo.displayTasks.map((task, index) => (
                    <div key={index} className="p-2">
                      <label>
                        <input type="checkbox" />
                        <span className="p-2">{task}</span>
                      </label>
                    </div>
                  ))}

                  <Button
                    btnName="Delete"
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    classes="bg-gray-200 w-full hover:bg-gray-300"
                  />
                </div>
              ))}
          </div>
          <div>
            {logOutLoading ? (
              <div>
                <h1>See ya</h1>
              </div>
            ) : (
              <Button
                btnName="Log out"
                type="button"
                onClick={handleLogOut}
                classes="bg-red-200 px-8 py-2 rounded hover:bg-red-500 duration-200"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-2 flex items-center text-xl">
            <h1>Don&apos;t have an account yet?</h1>
            <Link
              href="/signup"
              className="ml-2 rounded p-2 text-center duration-200 hover:bg-purple-300"
            >
              Sign up
            </Link>
          </div>
          <div className="mb-2 flex items-center text-xl">
            <h1>Alreay own an accout?</h1>
            <Link
              href="/"
              className="ml-2 flex rounded p-2 text-center duration-200 hover:bg-purple-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
