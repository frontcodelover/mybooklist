import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookFromSearch from "./BookFromSearch";
import genBook from "../../public/livre-generique.jpg";
import Image from "next/image";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

    useEffect(() => {
        searchTerm ? 

            axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40&language=fr`
      )
      .then((res) => {
          setBooks(res.data.items);
        })
      .catch((err) => {
          console.log(err);
        })
         :
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=philosophie&maxResults=40&language=fr`
        )
            .then((res) => {
                setBooks(res.data.items);
            }
        )
            .catch((err) => {
                console.log(err);
            }
        );
    
    }, [searchTerm]);

  return (
    <>
      <h1 className="text-3xl font-extrabold">Rechercher un livre</h1>
      <BookFromSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">

      {books.map((book) => (
          <div className="w-full lg:w-full lg:flex ">
              <div className="h-48 lg:h-auto lg:w-30 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                  {book.volumeInfo.imageLinks ? (
                      <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                  ) : (
                    <Image src={genBook} alt={book.volumeInfo.title} />
                    )}
                    
  </div>
          <div className="bg-gray-100 border-r rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                Members only
              </p>
                      <div className="text-gray-900 font-bold text-xl">
                          <Link href="/books/details/[id]" as={`/books/details/${book.id}`}>
                              {book.volumeInfo.title}
                            </Link>
                      </div>
                      {book.volumeInfo.subtitle ? (
                          <h3 className="text-base text-gray-600 font-bold mb-2">
                              {book.volumeInfo.subtitle}
                            </h3>
                      ) : (
                              ""
                            )}
              <p className="text-gray-700 text-base">
                          Auteur(s) : {book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Auteur inconnu"}
                      </p>
                      <p className="text-gray-700 text-base">
                          {book.volumeInfo.publishedDate ? "Publié en : " + book.volumeInfo.publishedDate.substring(0,4) : "date inconnue"}
                      </p>
                      <p className="text-gray-700 text-base">
                          {book.volumeInfo.description ? book.volumeInfo.description.substring(0,100) + " ..." : ""}
                          
              </p>
            </div>
            
          </div>
        </div>
      ))}

       
      </div>
    </>
  );
}
