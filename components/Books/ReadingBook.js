/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { BsPlay } from "react-icons/bs";
import Link from "next/link";

export default function ReadingBook({ bookid, userid }) {
  const db = getFirestore();
  const [isReading, setIsReading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await doc(db, "users", userid);
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setCurrentUser(user.data());
        const userData = user.data();
        if (userData?.reading?.includes(bookid)) {
          userData.reading.forEach((id) => {
            if (id == bookid) {
              setIsReading(true);
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
      reading: arrayUnion(bookid),
    });

    setIsReading(true);
  };

  const handleUnbookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid);
    await updateDoc(userDoc, {
      reading: arrayRemove(bookid),
    });
    setIsReading(false);
  };
  return (
    <div>
      {currentUser ? (
        <button
          onClick={isReading ? handleUnbookmark : handleBookmark}
          className="text-base"
        >
          {isReading ? (
            <p className="text-sm font-semibold text-green-500 flex">
              <div className="mt-1 pr-1">
                <BsPlay />
              </div>{" "}
              Je suis entrain de le lire
            </p>
          ) : (
            <p className="text-sm font-semibold text-main-color flex">
              <div className="mt-1 pr-1">
                <BsPlay />
              </div>{" "}
              Je suis entrain de le lire ?
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
    </div>
  );
}
