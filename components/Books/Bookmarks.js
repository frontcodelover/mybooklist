import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import Link from "next/link";

export default function Bookmarks({ bookid, userid }) {
  const db = getFirestore();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

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
  }, []);

  const handleBookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid);
    await updateDoc(userDoc, {
      bookid: arrayUnion(bookid),
    });
    setIsBookmarked(true);
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
      {currentUser ? (
        <button
          onClick={isBookmarked ? handleUnbookmark : handleBookmark}
          className="text-base"
        >
          {isBookmarked ? (
            <p className="text-sm font-semibold text-purple-500 flex">
              <div className="mt-1 pr-1">
                <BsFillBookmarkDashFill />
              </div>{" "}
              Déjà dans ma liste de lecture
            </p>
          ) : (
            <p className="text-sm font-semibold text-green-500 flex">
              <div className="mt-1 pr-1">
                <BsFillBookmarkPlusFill />
              </div>{" "}
              Ajouter à ma liste de lecture
            </p>
          )}
        </button>
      ) : (
        <Link href="/user/firststep">
          <a className="text-sm font-semibold text-red-500">
            Remplissez votre profil afin d'ajouter des livres dans votre
            bibliothèque.
          </a>
        </Link>
      )}
    </>
  );
}
