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
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";

export default function AlreadyRead({ bookid, userid  }) {
  const db = getFirestore();
  const [isReaded, setIsReaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userDoc = doc(db, "users", userid);
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setCurrentUser(user.data());
        const userData = user.data();
        if (userData?.readed?.includes(bookid)) {
          userData.readed.forEach((id) => {
            if (id === bookid) {
              setIsReaded(true);
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
      readed: arrayUnion(bookid),
    });
    setIsReaded(true);
  };

  const handleUnbookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid);
    await updateDoc(userDoc, {
      readed: arrayRemove(bookid),
    });
    setIsReaded(false);
  };

  return (
    <div>
      {currentUser ? (
        <button
          onClick={isReaded ? handleUnbookmark : handleBookmark}
          className="text-base"
        >
          {isReaded ? (
            <div className="text-sm font-semibold text-green-500 flex">
              <div className="mt-1 pr-1">
                <AiOutlineCheck />
              </div>{" "}
              Déjà lu
            </div>
          ) : (
            <div className="text-sm font-semibold text-main-color flex">
              <div className="mt-1 pr-1">
                <AiOutlineCheck />
              </div>{" "}
              Lu ?
            </div>
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
