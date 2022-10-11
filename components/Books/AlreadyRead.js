/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";

export default function AlreadyRead({ bookid, userid }) {
  const db = getFirestore();
  const [userBooksReaded, setUserBooksReaded] = useState([]);
  const [docId, setDocId] = useState("");
  const [alreadyRead, setAlreadyRead] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getListOfBooksReadead = async () => {
      try {

        const bookListRef = collection(db, "booksreaded");
        const q = query(bookListRef, where("userid", "==", userid));
        
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          setUserBooksReaded(doc.data());
          setDocId(doc.id);
          setIsLoaded(true);
        });
      } catch {
  
      }
      };
        function fetchBookReaded() {
          userBooksReaded?.books?.map((book) => {
            if (book.bookid == bookid) {
              setAlreadyRead(true);
            }
          });
          
        }
        isLoaded ? fetchBookReaded() : null;
        getListOfBooksReadead();
  }, [db, userid, bookid]);
  

  const date = new Date();

  const handleAddBookToAlreadyRead = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "booksreaded", docId);
    updateDoc(docRef, {
      books: arrayUnion({
        bookid: bookid,
      }),
    });
    setAlreadyRead(true);
  };

  const handleRemoveBookToAlreadyRead = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "booksreaded", docId);
    console.log("DOC", docRef);
    updateDoc(docRef, {
      books: arrayRemove({
        bookid: bookid,
      }),
    });
    setAlreadyRead(false);
  };

  return (
    <div>
      {alreadyRead ? (
        <div className="flex items-center">
          <AiOutlineCheck className="text-green-500" />
          <button
          onClick={handleRemoveBookToAlreadyRead}
          
        >
          déjà lu
        </button>
        </div>
      ) : (
        <button
          onClick={handleAddBookToAlreadyRead}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Non lu
        </button>
      )}
    </div>
  );
}
