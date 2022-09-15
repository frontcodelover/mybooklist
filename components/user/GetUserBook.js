import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import FetchBookBookmarked from "./FetchBookBookmarked";
import StatsBookmarks from "./StatsBookmarks";
import Link from "next/link";

export default function GetUserBook({ user }) {
  const [bookBookmarked, setBookBookmarked] = useState(null);
  const [result, setResult] = useState(null);

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
      });
    };
    setResult(tab);
    getBooks();
  }, [user, db]);

  return (
    <>
      <div>
        {bookBookmarked ? (
          bookBookmarked?.map(
            (book) => (
              console.log(book),
              book?.length > 0 ? (
                <>
                  <StatsBookmarks bookNumber={book?.length} />

                  <h2 className="font-semibold text-2xl py-3">
                    Ma liste de lecture
                  </h2>
                  <FetchBookBookmarked bookInfos={book} />
                </>
              ) : (
                <>
                  <h2 className="font-semibold text-2xl py-3">
                    Ma liste de lecture
                  </h2>
                  <StatsBookmarks bookNumber="0" />
                  <Link href="/books">
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-5">
                      Ajouter des livres
                    </button>
                    {/* <a className="underline text-purple-500">
                      Commencez votre liste de lecture en cliquant ici.
                    </a> */}
                  </Link>
                </>
              )
            )
          )
        ) : (
          <p>Vous n'avez pas encore de livre dans votre liste de lecture</p>
        )}
      </div>
    </>
  );
}
