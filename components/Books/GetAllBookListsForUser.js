import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

export default function GetAllBookListsForUser({ userid, bookid }) {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedLists, setCheckedLists] = useState([])
  const db = getFirestore();

  const bookListQuery = useQuery(["bookList", userid], () => {
    const q = query(
      collection(db, "publiclist"),
      where("userid", "==", userid)
    );
    return getDocs(q);
  });
  const bookLists = bookListQuery.data?.docs.map((doc) => doc.data());
  const isLoading = bookListQuery.isLoading;

  const bookAddedQuery = useQuery(["bookList", userid, bookid], () => {
    const q = query(
      collection(db, "publiclist"),
      where("bookid", "array-contains", bookid),
      where("userid", "==", userid)
    );
    return getDocs(q);
  });

  useEffect(() => {
    if (bookAddedQuery.data?.docs.length > 0 && bookAddedQuery.data != undefined) {

      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    console.log("bookAddedQuery.data?.docs.length", bookAddedQuery.data?.docs.length);
  }, [bookAddedQuery.data, bookAddedQuery.data?.docs.length]);

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (isChecked) {
      const userDoc = doc(db, "publiclist", e.target.value);
      await updateDoc(userDoc, {
        bookid: arrayRemove(bookid),
      });
      setIsChecked(false);
    } else {
      const userDoc = doc(db, "publiclist", e.target.value);
      await updateDoc(userDoc, {
        bookid: arrayUnion(bookid),
      });

      setIsChecked(true);
    }
  };

  console.log("bookLists", checkedLists);

  return (
    <>
      {!isLoading ? (
        bookLists?.map((bookList) => (
          <div key={bookList.id} className="pl-2 py-2">
            <input
              id="purple-checkbox"
              type="checkbox"
              value={bookList.id}
              onClick={(e) => handleBookmark(e, "value")}
              checked={checkedLists.includes(bookList.id)}
              onChange={(e) => setCheckedLists((current) => current.includes(bookList.id) ? current.filter((item) => item !== bookList.id) : current.concat(bookList.id))}
              className="w-4 h-4 -mt-1 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="purple-checkbox" className="ml-2 text-sm text-gray-900 dark:text-gray-300">{bookList.name}</label>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
