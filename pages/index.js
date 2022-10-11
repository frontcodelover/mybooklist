import Head from "next/head";
import TitleHomePage from "../components/Home/TitleHomePage";
import About from "../components/Home/About";
import Teams from "../components/Home/Teams";
import SectionCta from "../components/Home/SectionCta";
import { BOOKS_BY_ID, BOOKS_SEARCH } from "../services/api/googleBooks";
import BooksCarousselStatic from "../components/Home/BooksCarousselStatic";
import { BooksSelectedDatas } from "../components/Home/BooksSeletedDatas";
import BookSelection from "../components/Home/BookSelection";
import BanniereHome from "../components/Home/BanniereHome";
import HeroBan from "../components/Home/HeroBan";
import { bookOfTheMonth } from "../components/Books/Data/BookSelectionMonth";
import { useEffect } from "react";
import { useState } from "react";
import SelectedBooks from "../components/Home/SelectedBooks";

export default function Home({ booksStatic }) {
  const [selectedBooks, setSelectedBooks] = useState([]);
  useEffect(() => {
    async function getBooks(bookId) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );
        if (response.ok) {
          const newBook = await response.json();
          setSelectedBooks((oldBooks) =>
            Array.isArray(newBook)
              ? [...oldBooks, ...newBook]
              : [...oldBooks, newBook]
          );
          console.log("MA REP", newBook);
        }
      } catch (e) {
        console.log(e);
      }
    }
    bookOfTheMonth.map((book) => {
      getBooks(book);
    });
  }, []);

  console.log("BOUQUIIN", selectedBooks);

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
        <div className="bg-white my-10">
          <HeroBan />

          {/* <BanniereHome /> */}
          {/* <div className="container mx-auto">
            <TitleHomePage />
          </div> */}
        </div>

        <div className="py-10 px-5">
          <BookSelection BooksSelectedDatas={BooksSelectedDatas} />
        </div>
        <About />
        <div className="p-5 container mx-auto">
        <SelectedBooks bookId={selectedBooks} />
        </div>
        <div className="p-5 container mx-auto">
          <BooksCarousselStatic booksStatic={booksStatic} />
        </div>
        <Teams />
        <SectionCta />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${BOOKS_SEARCH}2022&langRestrict=fr&printType=books&maxResults=9&startIndex=0`
  );
  const booksStatic = await res.json();
  return {
    props: {
      booksStatic,
    },
  };
}
