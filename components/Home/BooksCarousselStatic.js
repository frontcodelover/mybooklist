import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import { hydrateBooks } from "../../services/mapper/mapper";

function BooksCarousselStatic({ booksStatic }) {
  const books = booksStatic.items;
  const bookInfos = hydrateBooks(books);

  return (
    <div>
      <div className="py-6">
        <h3 className="text-5xl py-9 mb-3 font-extrabold text-main-color ">
          Les derniers livres ajoutés
        </h3>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-6">
          {bookInfos.map((book) => {
            return (
              <div
                key={book.id}
                className="border bg-white border-slate-200 text-center p-5 rounded-xl shadow-lg"
              >
                {book.thumbnail ? (
                  <>
                    <Link href={`/books/details/${book.id}`}>
                      <a>
                        <img
                          src={book.thumbnail}
                          alt={book.title}
                          className="h-48 w-30 mx-auto hover:scale-105 duration-300"
                        />
                      </a>
                    </Link>
                    <Link href={`/books/details/${book.id}`}>
                      <a>
                        <p className="text-xs font-bold text-left my-4">{book.title}</p>
                      </a>
                    </Link>
                    <p className="text-xs text-left">{book.authors}</p>
                  </>
                ) : (
                  <>
                    <Link href={`/books/details/${book.id}`}>
                      <a className="">
                        <Image
                          src={genBook}
                          alt={book.title}
                          height={200}
                          width={150}
                          objectFit="cover"
                          className="hover:scale-105 duration-300"
                        />
                      </a>
                    </Link>
                    <Link href={`/books/details/${book.id}`}>
                      <p className="text-xs font-bold text-left my-4">{book.title}</p>
                    </Link>
                    <p className="text-xs text-left">{book.authors}</p>
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
