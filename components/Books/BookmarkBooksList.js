/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import {
  getDocs,  
  where,
  collection,
  query,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import Link from "next/link";
import { nanoid } from "nanoid";
import GetAllBookListsForUser from "./GetAllBookListsForUser";


export default function BookmarkBooksList({ bookid, userid }) {
  const db = getFirestore();
  const [userHasDocs, setUserHasDocs] = useState(false);

  useEffect(() => {
    const getBookList = async () => {
      const bookListRef = collection(db, "publiclist");
      const q = query(bookListRef, where("userid", "==", userid));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        setUserHasDocs(true);
      } else {
        setUserHasDocs(false);
      }
    };
    getBookList();
  }, [db, userid]);

  return (
    <>
      <details
        open
        className="group mx-auto overflow-hidden max-h-[56px] open:!max-h-[400px] transition-[max-height] duration-500"
      >
        <summary className="outline-none cursor-pointer font-semibold marker:text-transparent text-sm leading-5">
          <div className="flex">
            <div className="mt-1 pr-1">
              <BsFillBookmarkPlusFill />
            </div>{" "}
            Ajouter à mes listes de lecture
          </div>
        </summary>
        {userHasDocs ? (
          <div className="text-sm -m-4 -mt-2 p-4">
            <GetAllBookListsForUser userid={userid} bookid={bookid} />
          </div>
        ) : (
          <div className="text-sm -m-4 -mt-2 p-4">
            <div className="text-sm">
              Vous n'avez aucune liste.{" "}
              <Link href="/user/dashboard">
                <a className="text-blue-500">
                  <button className="my-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">Créer une liste</button>
                </a>
              </Link>
            </div>
          </div>
        )}
      </details>
    </>
  );
}
