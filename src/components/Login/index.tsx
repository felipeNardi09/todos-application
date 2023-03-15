import Input from "../Input";
import { useState, useEffect, type ChangeEvent } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import Button from "../Button";
import useValidateUser from "@/hooks/useValidateUser";
import { useRouter } from "next/router";

export default function Login() {
  const user = useValidateUser();

  const [error, setError] = useState("");

  const { signIn, error: authError, loading } = useAuthentication();

  const router = useRouter();

  const [formValue, setFormValue] = useState<{
    email: string;
    password: string;
    displayName: string;
  }>({
    email: "",
    password: "",
    displayName: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { email, password } = formValue;

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn(formValue);
  };

  useEffect(() => {
    if (user.user !== null && user.user !== undefined) {
      router.push("/todos");
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <form className="flex w-4/5 flex-col" onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeHolder="E-mail"
        classes="bg-orange-300 focus:bg-orange-200 duration-200 placeholder-gray-700 rounded p-4 text-center mb-2 focus:placeholder-gray-500 text-xl border-2 border-black w-full"
        onChange={handleInputChange}
        value={email}
      />
      <Input
        type="password"
        name="password"
        placeHolder="Enter your password"
        classes="bg-lime-200 duration-200 placeholder-gray-700 rounded p-4 text-center focus:placeholder-gray-500 focus:bg-lime-100 duration-200 mb-2 text-xl border-2 border-black w-full"
        onChange={handleInputChange}
        value={password}
      />
      {loading ? (
        <div>
          <h1 className="text-center text-xl">Logging in</h1>
        </div>
      ) : (
        <Button
          btnName="Log in"
          type="button"
          classes="p-4 border-2 rounded border-black hover:bg-blue-300 duration-200 text-xl"
          onClick={handleSubmit}
        />
      )}
      {error && <h1 className="px-4 pt-4 text-center text-xl">{error}</h1>}
    </form>
  );
}
