import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import Bookmarks from "./Bookmarks";
import { useAuth } from "../../context/AuthContext";

export default function BookLayout({ book }) {
  const { user } = useAuth();
  return (
    <div className="w-full h-60 max-h-60 flex">
      <div className="max-h-48 lg:h-auto lg:w-30 bg-cover text-center overflow-hidden">
        {book.volumeInfo.imageLinks ? (
          <Link href="/books/details/[id]" as={`/books/details/${book?.id}`}>

            <a>
            <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            />
            </a>
            </Link>
        ) : (
          <Link href="/books/details/[id]" as={`/books/details/${book?.id}`}>
          <a><Image src={genBook} alt={book.volumeInfo.title} /></a>
          </Link>
            )
        }
      </div>
      <div className="px-5 flex flex-col w-full">
        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl">
            <Link href="/books/details/[id]" as={`/books/details/${book?.id}`}>
              <a>{book.volumeInfo.title}</a>
            </Link>
          </div>
          {book.volumeInfo.subtitle ? (
            <h3 className="text-sm text-gray-600 font-bold mb-1">
              {book.volumeInfo.subtitle}
            </h3>
          ) : (
            ""
          )}
          <p className="text-gray-700 text-base">
            Auteur(s) :{" "}
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.map((author) => (
                <Link href="/books/author/[id]" as={`/books/author/${author}`}>
                <a><span key={author}>
                    {author + ". "}
                </span></a>
                </Link>
              ))
              : "Auteur inconnu"}
          </p>
          <p className="text-gray-700 text-base">
            {book.volumeInfo.publishedDate
              ? "Publié en : " + book.volumeInfo.publishedDate.substring(0, 4)
              : "date inconnue"}
          </p>
          {/* <p className="text-gray-700 text-base">
            {book.volumeInfo.description
              ? book.volumeInfo.description.substring(0, 70) + " ..."
              : ""}
          </p> */}
          {/* {user ? (
            <p className="my-2">
              <Bookmarks bookid={book.id} userid={userid} />
            </p>
          ) : (
            <p className="my-2 text-sm text-red-500 font-semibold">
              <Link href="user/signup">
                <a>Connectez-vous pour ajouter ce livre à vos favoris</a>
              </Link>
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
