import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import { getBookFromGoogleBookApi } from "../../services/mapper/mapper";

export default function BookLayout({ book }) {
  //Mapper
  const bookInfo = getBookFromGoogleBookApi(book);
  const randomBook = Math.floor(Math.random() * 1000);

  return (
    <div className="w-full h-60 max-h-60 flex">
      <div className="max-h-48 lg:h-auto lg:w-30 bg-cover text-center overflow-hidden">
        {bookInfo.thumbnail ? (
          <Link href="/books/details/[id]" as={`/books/details/${book?.id}`}>
            <a>
              <img src={bookInfo.thumbnail} alt={bookInfo.title} />
            </a>
          </Link>
        ) : (
          <Link href="/books/details/[id]" as={`/books/details/${book?.id}`}>
            <a>
              <Image src={genBook} alt={bookInfo.title} />
            </a>
          </Link>
        )}
      </div>
      <div className="px-5 flex flex-col w-full">
        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl">
            <Link href="/books/details/[id]" as={`/books/details/${book?.id}`}>
              <a>{bookInfo.title}</a>
            </Link>
          </div>
          {bookInfo.subtitle ? (
            <h3 className="text-sm text-gray-600 font-bold mb-1">
              {bookInfo.subtitle}
            </h3>
          ) : (
            ""
          )}
          <p className="text-gray-700 text-base">
            Auteur(s) :{" "}
            {console.log(bookInfo.authors)}
            {bookInfo.authors
              ? bookInfo.authors.map((author) => (
                    <Link
                  href="/books/author/[id]"
                  as={`/books/author/${author}`}
                  key={bookInfo.authors + randomBook}
                >
                  
                  <a>{author + ". "}</a>
                  
                  
                  </Link>
                ))
              : "Auteur inconnu"}
          </p>
          <p className="text-gray-700 text-base">
            {bookInfo.publishedDate
              ? "Publié en : " + bookInfo.publishedDate.substring(0, 4)
              : "date inconnue"}
          </p>
        </div>
      </div>
    </div>
  );
}
