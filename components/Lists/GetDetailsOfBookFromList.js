import React, { useEffect, useState } from "react";
import axios from "axios";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";
import BookLayout from "../Books/BookLayout";

export default function GetDetailsOfBookFromList({ book }) {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    axios.get(`${BOOKS_BY_ID}${book}`).then((res) => {
      setBookData(res.data);
    });
  }, []);

  return (
    <>
      <BookLayout book={bookData} />
    </>
  );
}
