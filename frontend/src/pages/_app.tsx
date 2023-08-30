import "@/app/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import DefaultLayout from "@/components/layouts/DefaultLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Resumate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>
  );
}

export default App;
