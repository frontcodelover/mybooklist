import React from "react";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import Bookmarks from "./Bookmarks";
import { useAuth } from "../../context/AuthContext";

export default function BookLayout({ book, userid }) {
  const { user } = useAuth();
  return (
    <div className="w-full lg:w-full lg:flex shadow-lg my-1 p-5 h-60 max-h-60 border rounded-lg">
      <div className="max-h-48 lg:h-auto lg:w-30 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden my-auto">
        {book.volumeInfo.imageLinks ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        ) : (
          <Image src={genBook} alt={book.volumeInfo.title} />
        )}
      </div>
      <div className="my-auto px-5 py-auto flex flex-col leading-normal w-full align-middle justify-center">
        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl">
            <Link href="/books/details/[id]" as={`/books/details/${book.id}`}>
              {book.volumeInfo.title}
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
              ? book.volumeInfo.authors[0]
              : "Auteur inconnu"}
          </p>
          <p className="text-gray-700 text-base">
            {book.volumeInfo.publishedDate
              ? "Publié en : " + book.volumeInfo.publishedDate.substring(0, 4)
              : "date inconnue"}
          </p>
          <p className="text-gray-700 text-base">
            {book.volumeInfo.description
              ? book.volumeInfo.description.substring(0, 70) + " ..."
              : ""}
          </p>
          {user ? (
            <p className="my-2">
              <Bookmarks bookid={book.id} userid={userid} />
            </p>
          ) : (
            <p className="my-2 text-sm text-red-500 font-semibold">
              <Link href="user/signup">
                <a>Connectez-vous pour ajouter ce livre à vos favoris</a>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
