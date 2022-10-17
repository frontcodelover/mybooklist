import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";

export default function DisplayLists({ userid }) {
  const db = getFirestore();

  const bookListQuery = useQuery(
    ["bookList", userid],
    () => {
      const q = query(
        collection(db, "publiclist"),
        where("userid", "==", userid)
      );
      return getDocs(q);
    },
    {}
  );
  const resultbookListQuery =
    (bookListQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoadingQuery = bookListQuery.isLoading;

  return (
    <>
      {isLoadingQuery ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <h2 className="text-3xl font-bold mb-3 text-main-color">
            Mes listes de lecture
          </h2>
          {resultbookListQuery.length ? (
            resultbookListQuery?.map((docData) => {
              return (
                <div key={docData.id} className="pl-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Link href={`/list/${docData?.slug}`}>
                      <a>
                        <h2 className="text-2xl font-semibold" style={{ color: docData?.color }}>
                          {docData.name}
                        </h2>
                      </a>
                    </Link>
                    <div className="flex flex-row gap-2 mt-2">
                      <span className="mt-1">
                        <IoBookSharp />
                      </span>
                      <p className="font-bold">
                        {docData?.bookid?.length != undefined
                          ? "("+ docData?.bookid?.length + ")"
                          : "(0)"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{docData?.description}</p>
                </div>
              );
            })
          ) : (
            <p>Aucune liste de lecture</p>
          )}
        </div>
      )}
    </>
  );
}
