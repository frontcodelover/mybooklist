import Head from "next/head";
import TitleHomePage from "../components/Home/TitleHomePage";
import About from "../components/Home/About";
import Teams from "../components/Home/Teams";
import SectionCta from "../components/Home/SectionCta";
import { BOOKS_SEARCH } from "../services/api/googleBooks";
import BooksCarousselStatic from "../components/Home/BooksCarousselStatic";
import { BooksSelectedDatas } from "../components/Home/BooksSeletedDatas";
import BookSelection from "../components/Home/BookSelection";

export default function Home({booksStatic}) {
  return (
    <div>
      <Head>
        <title>ListeDeLecture</title>
        <meta
          name="description"
          content="Mybooklist vous permet de garder une trace de vos lectures"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mx-auto">
          <TitleHomePage />
          <About />
        </div>
        <div className="pt-16">
          <SectionCta />
        </div>
        <div className="p-5 container mx-auto">
          <BooksCarousselStatic booksStatic={booksStatic}/>
        </div>
        <BookSelection BooksSelectedDatas={BooksSelectedDatas} />
        <Teams />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${BOOKS_SEARCH}2021&langRestrict=fr&printType=books&maxResults=18&startIndex=0`
  );
  const booksStatic = await res.json();
  return {
    props: {
      booksStatic,
    },
  };
}
