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
  console.log(searchTerm);

  useEffect(() => {
    searchTerm
      ? axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40&language=fr`
          )
          .then((res) => {
            setBooks(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          })
      : axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=philosophie&maxResults=40&language=fr`
          )
          .then((res) => {
            setBooks(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [searchTerm]);

  return (
    <>
      <h1 className="text-3xl font-semibold">Rechercher un livre</h1>
      <BookFromSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id}>
           
                {/* <Bookmarks bookid={book.id} userid={user.uid} /> */}
                <BookLayout book={book} userid={user?.uid}/>
              </div>

          
        ))}
      </div>
    </>
  );
}
