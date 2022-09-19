/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import Link from "next/link";
import { nanoid } from "nanoid";
import GetAllBookListsForUser from "./GetAllBookListsForUser";

export default function BookmarkBooksList({ bookid, userid }) {
  const db = getFirestore();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  const uuid = nanoid();

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await doc(db, "users", userid);
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setCurrentUser(user.data());
        const userData = user.data();
        if (userData?.bookid?.includes(bookid)) {
          userData.bookid.forEach((id) => {
            if (id === bookid) {
              setIsBookmarked(true);
            }
          });
        }
      }
    };
    getUser();
  }, [bookid, db, userid]);

  const handleBookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid);
    await updateDoc(userDoc, {
      bookid: arrayUnion(bookid),
    });
    setIsBookmarked(true);
    const list = doc(db, "publiclist", uuid);
    await setDoc(list, {
      bookid: arrayUnion(bookid),
    });
  };

  const handleUnbookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid);
    await updateDoc(userDoc, {
      bookid: arrayRemove(bookid),
    });
    setIsBookmarked(false);
  };
  return (
    <>
    <details
        open
        className="group mx-auto overflow-hidden max-h-[56px] open:!max-h-[400px] transition-[max-height] duration-500"
      >
        <summary className="outline-none cursor-pointer font-semibold marker:text-transparent text-sm">
          <div className="flex">
            <div className="mt-1 pr-1">
              <BsFillBookmarkPlusFill />
            </div>{" "}
            Ajouter à ma liste de lecture
          </div>
        </summary>

        <div className="text-sm -m-4 -mt-2 p-4">
          <GetAllBookListsForUser userid={userid} bookid={bookid} />
        </div>
      </details>
    </>
  )
}
