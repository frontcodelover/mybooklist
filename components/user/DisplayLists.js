import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DisplayLists({ userid }) {
  const db = getFirestore();
  const [allLists, setAllLists] = useState(null);
  const bookListQuery = useQuery(["bookList", userid], () => {
    const q = query(
      collection(db, "publiclist"),
      where("userid", "==", userid)
    );
    return getDocs(q);
  });
  const resultbookListQuery =
    (bookListQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoadingQuery = bookListQuery.isLoading;

  console.log("resultbookListQuery", resultbookListQuery);

  resultbookListQuery.map((list) => {
    console.log("list", list?.bookid?.length);
  });

  return (
    <>
      {isLoadingQuery ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <h2 className="text-3xl font-bold mb-3 text-main-color">
            Mes listes de lecture
          </h2>
          {resultbookListQuery?.map((docData) => {
            return (
              <div key={docData.id} className="pl-2 py-2">
                <Link href={`/list/${docData?.slug}`}>
                  <a>{docData.name}
                  </a>
                </Link>
                - {docData?.bookid?.length != undefined ? docData?.bookid?.length + " livres ajoutés" : "0 livre ajouté"}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
