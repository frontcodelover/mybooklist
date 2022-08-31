import Head from "next/head";
import styles from "../styles/Home.module.css";
import TitleHomePage from "../components/Home/TitleHomePage";
import About from "../components/Home/About";
import Teams from "../components/Home/Teams";

export default function Home() {

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Mybooklist vous permet de garder une trace de vos lectures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleHomePage />
      <main >
        <Teams />
        <About />
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
