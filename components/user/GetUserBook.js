import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import FetchBookBookmarked from "./FetchBookBookmarked";

export default function GetUserBook({ user }) {
  const [bookBookmarked, setBookBookmarked] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    let tab = [];
    let tabid = [];
    const getBooks = async () => {
      const queriedCurrentUser = query(
        collection(db, "users"),
        where("uid", "==", user)
      );
      const queriedCurrentUserResult = await getDocs(queriedCurrentUser);

      queriedCurrentUserResult.forEach((doc) => {
        tab.push(doc.data());
        tab.map((bookid) => {
          tabid.push(bookid.bookid);
          setBookBookmarked(tabid);
        });
        console.log("TABID", tabid);
      });
    };
    getBooks();
  }, [user]);

  return (
    <>
      <div>
        GetUserBook
        {bookBookmarked.map((book) => (
          <>
            {console.log(book)}
            <FetchBookBookmarked bookInfos={book} />
          </>
        ))}
      </div>
    </>
  );
}
