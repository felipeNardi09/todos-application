import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import useValidateUser from "@/hooks/useValidateUser";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useValidateUser();

  return (
    <>
      <AuthProvider value={user}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
