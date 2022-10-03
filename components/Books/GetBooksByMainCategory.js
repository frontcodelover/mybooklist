import axios from "axios";
import React, { useEffect, useState } from "react";
import { hydrateBooks } from "../../services/mapper/mapper";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import { BOOKS_SEARCH } from "../../services/api/googleBooks";

export default function GetBooksByMainCategory({ category }) {


  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${BOOKS_SEARCH}subject:${category}&maxResults=12&langRestrict=fr&printType=books`
      )
      .then((res) => {
        setBooks(res.data.items);
      });
  }, [category]);

  let booksInfos;
  if (books !== undefined) {
    booksInfos = hydrateBooks(books);
  }

  return (
    <>
      {booksInfos && booksInfos.length > 0 ? (
        <>
          <h3 className="text-3xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color">
            Vous aimerez aussi
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">
            {booksInfos.map((book) => (
              <div className="flex-cols w-36" key={book.id + "_3"}>
                {book.thumbnail ? (
                  <Link href={`/books/details/${book.id}`}>
                    <a>
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="mx-auto mb-5 h-48"
                      />
                    </a>
                  </Link>
                ) : (
                  <div className="mx-auto mb-5 h-48 " key={book.id + "_33"}>
                    <Link href={`/books/details/${book.id}`}>
                      <a>
                        <Image
                          src={genBook}
                          alt={book.title}
                          className="h-48 "
                        />
                      </a>
                    </Link>
                  </div>
                )}
                <h1 className="text-sm font-semibold">
                  <Link href={`/books/details/${book.id}`}>
                    <a>
                      {book.title.length > 30
                        ? book.title.substring(0, 30) + "..."
                        : book.title}
                    </a>
                  </Link>
                </h1>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
