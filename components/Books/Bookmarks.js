import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default function Bookmarks({ bookid, userid }) {
    console.log(bookid, userid);
    const db = getFirestore();
    const [user, setUser] = useState({});
    const [bookmarked, setBookmarked] = useState("");
    let tabbook = []

  useEffect(() => {
    const getUser = async () => {
      const usersCollection = collection(db, "users");
      const queriedCurrentUser = query(
        usersCollection,
        where("uid", "==", userid)
      );
      const queriedCurrentUserResult = await getDocs(queriedCurrentUser);

      queriedCurrentUserResult.forEach((doc) => {
        setUser(doc.data());
    });
};

      handleBookmark()
      bookmarkeddd()
      
      getUser();
    }, [userid, bookid]);
    
    function bookmarkeddd() {
        try {
            if (user.bookmarks.includes(bookid)) {
                setBookmarked("bookmarked");
            } else {
                setBookmarked("");
            }
        }
        catch {
            setBookmarked("");
        }
    }

    const handleBookmark = () => {
        user?.bookid?.map((books) => {
            tabbook.push(books)
        })
    }



  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const addBookToCurrentUser = doc(db, "users", userid);
      await updateDoc(addBookToCurrentUser, { bookid: arrayUnion(bookid) });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    try {
      const removeBookToCurrentUser = doc(db, "users", userid);
      await updateDoc(removeBookToCurrentUser, { bookid: arrayRemove(bookid) });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  return (
      <>
          {tabbook.includes(bookid) ? (
        <button
          onClick={handleRemove}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {bookmarked}
         
                      </button>
      ) : (
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {bookmarked}
        </button>
              )
            }
      
    </>
  );
}
