import React, { useEffect, useState } from "react";
import axios from "axios";
import BookLayout from "../Books/BookLayout";
import { useAuth } from "../../context/AuthContext";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../feature/book/bookSlice";


export default function FetchBookBookmarked({ bookInfos }) {
  const [bookDetail, setBookDetail] = useState([]);
  const { user } = useAuth();
  const dispatch = useDispatch();


  useEffect(() => {
    // let allBook = [];
    let ignore = false;
    bookInfos?.map(async (book) => {
      dispatch(getBook({ bookid: book }));

      
      await axios.get(`${BOOKS_BY_ID}${book}`).then((res) => {
        // allBook.push(res.data);
        if (!ignore) {
          setBookDetail((oldValues) => [...oldValues, res.data]);
        }
      });
    });
    return () => {
      ignore = true;
    };
  }, [bookInfos, dispatch]);

  console.log(bookDetail);

  return (
    <>
      {bookDetail.map((book) => (
        <div key={book.id}>
          <BookLayout book={book} userid={user?.uid} />
        </div>
      ))}
    </>
  );
}
