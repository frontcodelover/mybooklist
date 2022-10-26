import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import { hydrateBooks } from "../../services/mapper/mapper";

function BooksCarousselStatic({ booksStatic }) {
  const books = booksStatic.items;
  const bookInfos = hydrateBooks(books);

  const withoutIMG = bookInfos.filter((book) => {
    return book.thumbnail !== undefined
  })

  return (
    <div>
      <div className="py-6">
        <h3 className="text-5xl py-9 mb-3 font-extrabold text-main-color tracking-tight">
          Les derniers livres ajoutés
        </h3>
        <div className="grid lg:grid-cols-9 md:grid-cols-3 grid-cols-2 gap-2">
          {withoutIMG.map((book) => {
            return (
              <div
                key={book.id}
                className=""
              >
                {book.thumbnail ? (
                  <>
                    <Link href={`/books/details/${book.id}`}>

                        <Image
                          src={book.thumbnail}
                          alt={book.title}
                          height={224}
                          width={152}
                          className="h-48 w-30 mx-auto hover:scale-105 duration-300"
                        />

                    </Link>

                  </>
                ) : (
                  <>
                    <Link href={`/books/details/${book.id}`}>

                        <Image
                          src={genBook}
                          alt={book.title}
                          height={224}
                          width={152}
                          objectFit="cover"
                          className="hover:scale-105 duration-300"
                        />

                    </Link>

                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BooksCarousselStatic;
