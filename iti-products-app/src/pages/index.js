import Head from "next/head";
import HomeComponent from "@/components/HomeComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>ITI Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <HomeComponent />
      </main>
    </>
  );
}
