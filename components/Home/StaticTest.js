import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import {hydrateBooks} from "../../services/mapper/mapper";

function BooksCarousselStatic({ booksStatic }) {
  
  const books = booksStatic.items;
  console.log(books);
  const bookInfos = hydrateBooks(books);

  console.log(bookInfos)

  return (
    <div>
      <div className="py-6">
        <h3 className="text-4xl py-9 mb-3 font-bold text-center text-main-color ">
          Les derniers livres ajoutés
        </h3>
        <div className="grid lg:grid-cols-9 md:grid-cols-6 grid-cols-3 gap-5">
          {bookInfos.map((book) => {
            return (
              <div
                key={book.id}
                className="hover:scale-105 transform transition duration-300 "
              >
                <Link href={`/books/details/${book.id}`}>
                  {book.thumbnail ? (
                    <a>
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="h-48 w-30"
                      />
                      <p className="text-xs font-bold">{book.title}</p>
                    </a>
                  ) : (
                    <a className="hover:scale-125">
                      <Image
                        src={genBook}
                        alt={book.title}
                        height={200}
                        width={150}
                      />
                      <p className="text-xs font-bold">{book.title}</p>
                    </a>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BooksCarousselStatic;
