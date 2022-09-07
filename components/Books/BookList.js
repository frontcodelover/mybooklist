import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookFromSearch from "./BookFromSearch";
import genBook from "../../public/livre-generique.jpg";
import Image from "next/image";
import BookLayout from "./BookLayout";
import { useAuth } from "../../context/AuthContext";
import Bookmarks from "./Bookmarks";

export default function BookList() {
  const { user } = useAuth();
  console.log(user);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inAuthor, setInAuthor] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  console.log(searchTerm);

  useEffect(() => {
    searchTerm
      ? axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=39&startIndex=${startIndex}&langRestrict=fr&printType=books`
          )
          .then((res) => {
            setBooks(res.data.items);
            setTotalItems(res.data.totalItems);
          })
          .catch((err) => {
            console.log(err);
          })
      : axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=philosophie&maxResults=40&langRestrict=fr`
          )
          .then((res) => {
            setBooks(res.data.items);
            setTotalItems(res.data.totalItems);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [searchTerm, inAuthor, startIndex]);

  function nextIndex(e) {
    e.preventDefault();
    setStartIndex(startIndex + 40);
    window.scrollTo(0, 0);
  }

  function previousIndex(e) {
    e.preventDefault();
    setStartIndex(startIndex - 40);
  }

  console.log(books);

  return (
    <>
      <h1 className="text-3xl font-semibold">Catalogue</h1>
      <BookFromSearch
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className="grid grid-cols-1 gap-1 lg:max-w-screen-md mx-auto w-full">
      <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
        Résultats de la recherche
      </h3>
        <div>
          Nous avons trouvé <b>{totalItems} résultats</b> correspondant à la
          recherche <b>{searchTerm}</b>
        </div>
        {books?.map((book) => (
          <div key={book.id}>
            {/* <Bookmarks bookid={book.id} userid={user.uid} /> */}
            <BookLayout book={book} userid={user?.uid} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={previousIndex}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Précédent
        </button>
        <button
          onClick={nextIndex}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Suivant
        </button>
      </div>
    </>
  );
}
