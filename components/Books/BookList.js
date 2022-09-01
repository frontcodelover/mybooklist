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
      <h1 className="text-3xl font-semibold">Rechercher un livre</h1>
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

                      <div className="text-gray-900 font-bold text-xl">
                          <Link href="/books/details/[id]" as={`/books/details/${book.id}`}>
                              {book.volumeInfo.title}
                            </Link>
                      </div>
                      {book.volumeInfo.subtitle ? (
                          <h3 className="text-base text-gray-600 font-bold mb-1">
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
                          {book.volumeInfo.description ? book.volumeInfo.description.substring(0,50) + " ..." : ""}
                          
              </p>
            </div>
            
          </div>
        </div>
      ))}

       
      </div>
    </>
  );
}
