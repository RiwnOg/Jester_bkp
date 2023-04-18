import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "~/components/navbar/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jester</title>
        <meta name="description" content="Life Companion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Navbar />
        </div>
      </main>
    </>
  );
};

export default Home;
