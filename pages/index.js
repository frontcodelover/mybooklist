import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Auth } from "../components/firebase";

console.log();

export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Mybooklist vous permet de garder une trace de vos lectures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
      
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
