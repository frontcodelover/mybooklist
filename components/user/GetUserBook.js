import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";
import FetchBookBookmarked from "./FetchBookBookmarked";

export default function GetUserBook({ user }) {
  const [bookBookmarked, setBookBookmarked] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    let tab = [];
    const getBooks = async () => {
      const queriedCurrentUser = query(
        collection(db, "books"),
        where("userid", "==", user)
      );
      const queriedCurrentUserResult = await getDocs(queriedCurrentUser);

      queriedCurrentUserResult.forEach((doc) => {
        tab.push(doc.data());
        setBookBookmarked(tab);
      });
    };
    getBooks();
  }, [user]);

  // useEffect(() => {
  // let allBook = []

  // bookBookmarked.map((book) => {
  //     axios.get(`https://www.googleapis.com/books/v1/volumes/${book.bookid}`)
  //         .then((res) => {
  //             allBook.push(res.data)
  //             setBookInfos(allBook)
  //         }
  //         )
  // })
  // }, [bookBookmarked])

  return (
    <>
      <div>GetUserBook</div>
      <div className="">
        <FetchBookBookmarked bookInfos={bookBookmarked} />
        <div></div>
      </div>
    </>
  );
}
