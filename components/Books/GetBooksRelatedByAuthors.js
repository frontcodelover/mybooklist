import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { hydrateBooks } from "../../services/mapper/mapper";
import genBook from "../../public/livre-generique.jpg";
import Image from "next/image";
import Link from "next/link";

export default function GetBooksRelatedByAuthors({ author }) {
  const [books, setBooks] = useState([]);
  console.log(author);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&maxResults=14&langRestrict=fr&printType=books`
      )
      .then((res) => {
        console.log(res.data);
        setBooks(res.data.items);
      });
  }, [author]);

  let booksInfos;
  if (books !== undefined) {
    booksInfos = hydrateBooks(books);
  }

  return (
    <>
      {booksInfos && booksInfos.length > 0 ? (
        <>
          <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
            Les autres ouvrages de {author}
          </h3>
          <div className="grid grid-cols-7 gap-5">
            {booksInfos.map((book) => (
              <div className="flex-cols w-36">
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
                  <div className="mx-auto mb-5 h-48 ">
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
                      {book?.title?.length > 30
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
