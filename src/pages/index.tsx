import type { NextPage } from "next";
import Login from "@/components/Login";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center ">
      <Login />
      <div className="flex items-center p-4 text-xl">
        <h2>Don&apos;t have an account yet?</h2>
        <Link
          href="/signup"
          className="ml-2 rounded p-2 text-center duration-200 hover:bg-purple-300"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Home;
