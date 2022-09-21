import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import BookLayout from "../Books/BookLayout";
import axios from "axios";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";
import { useEffect } from "react";
import GetDetailsOfBookFromList from "./GetDetailsOfBookFromList";

export default function GetAllBooksFromTheList({ slug }) {
  const [bookId, setBookId] = React.useState([]);

  const db = getFirestore();

  //! NEED TO ADD GOOGLE API

  const bookListQuery = useQuery(["publiclist"], () => {
    const q = query(collection(db, "publiclist"), where("slug", "==", slug));
    return getDocs(q);
  });
  const bookFromList =
    (bookListQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoading = bookListQuery.isLoading;




  return (
    <>
          <div className="grid grid-cols-1 gap-1 lg:max-w-screen-md mx-auto w-full">
            <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
              Liste de lecture : {bookFromList[0]?.name} par {bookFromList[0]?.pseudo}
            </h3>

            <div>
              {bookFromList.map((book) => {

                return (
                  <div key={book}>
                  {book.bookid.map((id) => {
                      // eslint-disable-next-line react/jsx-key
                      return <GetDetailsOfBookFromList book={id} />;
                    })}
                    </div>
                );
              }
              )}
            </div>
          </div>
    </>
  );
}

// {bookFromList?.map((docData) => (
//   <div key={docData.id} className="pl-2 py-2">
//     {docData.bookid.map((book) => (
//       <GetDetailsOfBookFromList book={book} />
//     ))}