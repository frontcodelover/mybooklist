import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import { hydrateBooks } from "../../services/mapper/mapper";

function GetIsbnBook({ bookId }) {


  const bookInfos = hydrateBooks(bookId);

  return (
    <div>
      <div className="py-6">
        <h3 className="text-5xl py-9 mb-3 font-extrabold text-main-color tracking-tight">
          Les meilleures ventes de livres
        </h3>
        <div className="grid lg:grid-cols-9 md:grid-cols-3 grid-cols-2 gap-2">
          {bookInfos.map((book) => {
            return (
              <div
                key={book.id +3}
                className=""
              >
                {book.thumbnail ? (
                  <>
                    <Link href={`/books/details/${book.id}`}>
                      <a>
                        <Image
                          src={book.thumbnail}
                          alt={book.title}
                          height={224}
                          width={152}
                          className="h-48 w-30 mx-auto hover:scale-105 duration-300"
                        />
                      </a>
                    </Link>

                  </>
                ) : (
                  <>
                    <Link href={`/books/details/${book.id}`}>
                      <a className="">
                        <Image
                          src={genBook}
                          alt={book.title}
                          height={224}
                          width={152}
                          objectFit="cover"
                          className="hover:scale-105 duration-300"
                        />
                      </a>
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

export default GetIsbnBook;
