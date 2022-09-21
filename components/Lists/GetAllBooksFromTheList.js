import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import BookLayout from '../Books/BookLayout';
import axios from 'axios'
import { BOOKS_BY_ID } from '../../services/api/googleBooks'
import { useEffect } from 'react';

export default function GetAllBooksFromTheList({slug}) {
  const [bookId, setBookId] = React.useState([]);
  
  const db = getFirestore();

  //! NEED TO ADD GOOGLE API

  const bookListQuery = useQuery(["publiclist"], () => {
    const q = query(
      collection(db, "publiclist"),
      where("slug", "==", slug)
    );
    return getDocs(q);
  });
  const bookFromList =
    (bookListQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoading = bookListQuery.isLoading;



  console.log(bookFromList)


  return (
    <>
    <div>GetAllBooksFromTheList</div>
      <h1>{slug}</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          {bookFromList?.map((docData) => {
            return (
              <div key={docData.id} className="pl-2 py-2">
                {docData.name}
                {docData.bookid.map ((book) => {
                  return (
                    <div key={book} className="pl-2 py-2">
                     <BookLayout book={book} />
                    </div>
                  )
                }
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  )
}