import React, { useEffect, useState } from "react";
import axios from "axios";
import BookLayout from "../Books/BookLayout";

export default function FetchBookBookmarked({ bookInfos }) {
  const [bookDetail, setBookDetail] = useState([]);

  useEffect(() => {
    // let allBook = [];
    let ignore = false;
    bookInfos.map(async (book) => {
      await axios
        .get(`https://www.googleapis.com/books/v1/volumes/${book}`)
        .then((res) => {
          // allBook.push(res.data);
          if (!ignore) {
            setBookDetail((oldValues) => [...oldValues, res.data]);
          }
        });
    });
    return () => {
      ignore = true;
    };
  }, [bookInfos]);

  console.log(bookDetail);

  return (
    <>
      {bookDetail.map((book) => (
        <div key={book.id}>
          <BookLayout book={book} />
        </div>
      ))}
    </>
  );
}
