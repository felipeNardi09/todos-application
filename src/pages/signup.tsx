import { type ChangeEvent, useState, useEffect, type FormEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthentication } from "@/hooks/useAuthentication";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const [error, setError] = useState<boolean | string>(false);

  const { createUser, error: authError, loading } = useAuthentication();

  const router = useRouter();

  const [formValue, setFormValue] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
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

  const { email, displayName, password, confirmPassword } = formValue;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords must be the same");
      return;
    }

    const response = await createUser(formValue);

    if (response) {
      router.push("/todos");
    }

    setError(false);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    } else {
      setError(false);
    }
  }, [authError]);

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex w-4/5 flex-col border-y  py-8"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          classes="bg-emerald-400 focus:bg-emerald-300 duration-200 placeholder-gray-700 rounded p-1 text-center mb-2 focus:placeholder-gray-500 text-xl border-2 border-black w-full"
          placeHolder="E-mail"
          onChange={handleInputChange}
          value={email}
        />
        <Input
          type="text"
          name="displayName"
          classes="bg-emerald-400 focus:bg-emerald-300 duration-200 placeholder-gray-700 rounded p-1 text-center mb-2 focus:placeholder-gray-500 text-xl border-2 border-black w-full"
          placeHolder="Name"
          onChange={handleInputChange}
          value={displayName}
        />

        <Input
          type="password"
          name="password"
          classes="bg-emerald-400 focus:bg-emerald-300 duration-200 placeholder-gray-700 rounded p-1 text-center mb-2 focus:placeholder-gray-500 text-xl border-2 border-black w-full"
          placeHolder="Password"
          onChange={handleInputChange}
          value={password}
        />
        <Input
          type="password"
          name="confirmPassword"
          classes="bg-emerald-400 focus:bg-emerald-300 duration-200 placeholder-gray-700 rounded p-1 text-center mb-2 focus:placeholder-gray-500 text-xl border-2 border-black w-full"
          placeHolder="Confirm password"
          onChange={handleInputChange}
          value={confirmPassword}
        />
        {loading ? (
          <h2 className="mt-4 text-center text-xl">Loading</h2>
        ) : (
          <Button
            btnName="Sign up"
            type="submit"
            classes="placeholder-gray-700 rounded p-2 text-center mb-2 text-xl bg-cyan-200 hover:bg-cyan-300 duration-300 w-full"
          />
        )}
        {error && <p className="mt-4 text-center text-xl">{error}</p>}
      </form>
      <div className="flex items-center p-2">
        <h2>Already own an account?</h2>
        <Link
          href="/"
          className="ml-2 flex rounded p-2 text-center duration-200 hover:bg-purple-300"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
