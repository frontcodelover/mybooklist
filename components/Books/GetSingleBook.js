import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

export default function GetSingleBook({ id }) {
  const [bookInfos, setBookInfos] = useState({});
  const [bookDescription, setBookDescription] = useState("");

  useEffect(() => {
    console.log(id);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => {
        const getBook = res.data;
        console.log(getBook);
        setBookInfos(getBook);
        if (getBook.volumeInfo.description) {
          setBookDescription(parse(getBook.volumeInfo.description));
        }
      });
  }, [id]);

  return (
    <>
      <div>GetSingleBook</div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <img
            src={bookInfos.volumeInfo?.imageLinks?.thumbnail}
            alt={bookInfos.volumeInfo?.title}
          />
          <h2 className="text-2xl">{bookInfos.volumeInfo?.title}</h2>
          <h3 className="text-xl">{bookInfos.volumeInfo?.subtitle}</h3>
          Auteur(s) :{" "}
          {bookInfos.volumeInfo?.authors ? (
            bookInfos.volumeInfo?.authors.map((author) => (
              <p key={author}>{author}</p>
            ))
          ) : (
            <p>Auteur inconnu</p>
          )}
          {bookInfos.volumeInfo?.categories ? (
            bookInfos.volumeInfo?.categories.map((category) => (
              <p key={category}>{category}</p>
            ))
          ) : (
            <p>Catégorie inconnue</p>
          )}
          <p>{bookDescription}</p>
          <p>{bookInfos.volumeInfo?.pageCount} pages</p>
        </div>
      </div>
    </>
  );
}
