//! REFAIRE LE TOUT AVEC UNE FONCTION ASYNC POUR FETCH LES LISTES
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import GetDetailsOfBookFromList from "./GetDetailsOfBookFromList";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function GetAllBooksFromTheList({ slug }) {
  const [dataFormQuery, setDataFormQuery] = useState(false);
  const [dataSlug, setDataSlug] = useState('')
  const db = getFirestore();


  const bookListQuery = useQuery(["publiclist", slug], () => {
    const q = query(collection(db, "publiclist"), where("slug", "==", slug));
    
    return getDocs(q)
    });
  
    const bookFromList =
    (bookListQuery?.data?.docs || []).map((doc) => doc.data()) || null;
    const isLoading = bookListQuery.isSuccess;

  useEffect(() => {
    if (slug) {
      setDataSlug(slug)
    }

    bookListQuery.data?.docs?.map((doc) => {
      setDataFormQuery(doc.data());
    });
  }, [bookListQuery?.data, slug]);

  return (
    <>
      <div className="grid grid-cols-1 gap-1 lg:max-w-screen-md mx-auto w-full">
        <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
          Liste de lecture : {bookFromList[0]?.name} par{" "}
          {bookFromList[0]?.pseudo}
        </h3>

        <div>
          {dataFormQuery?.bookid?.length >= 1 ? (
            bookFromList?.map((book) => {
              return (
                <div key={book}>
                  <>{book.description}</>
                  {book?.bookid?.map((id) => {
                    // eslint-disable-next-line react/jsx-key
                    return <GetDetailsOfBookFromList book={id} />;
                  })}
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <p className="text-xl font-semibold">
                Aucun livre dans cette liste pour le moment
              </p>
              <p>
                Commencez dès maintenant à ajouter des livres dans votre liste
                de lecture
              </p>
              <button className="bg-purple-500 text-white p-2 rounded-md shadow font-semibold mt-4">
                <Link href="/books">
                  <a>Voir tous les livres</a>
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
