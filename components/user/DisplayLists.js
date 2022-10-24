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
import DisplayCover from "./DisplayCover";

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

  let tab = [];

  //fonction qui créé un tableau qui sera parser ensuite pour afficher les coovertures des livres dans la liste sur le dashboard
  function getBookInfo() {
    if (!isLoadingQuery) {
      resultbookListQuery.map(
        (r) => r?.bookid?.length > 0 && tab.push({ id: r.id, bookid: r.bookid })
      );
    }
  }
  getBookInfo();

  console.log(tab);

  return (
    <>
      {isLoadingQuery ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <h2 className="text-3xl font-bold mb-3 text-main-color tracking-tight">
            Mes listes de lecture
          </h2>
          {resultbookListQuery.length ? (
            resultbookListQuery?.map((docData) => {
              return (
                <div key={docData.id} className="pl-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Link href={`/list/${docData?.slug}`}>
                      <a>
                        <h2
                          className="text-2xl font-semibold tracking-tight my-2"
                          style={{ color: docData?.color }}
                        >
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
                          ? "(" + docData?.bookid?.length + ")"
                          : "(0)"}
                      </p>
                    </div>
                    <p>
                      {!docData.private ? (
                        <div className="px-4 pb-1 mt-2 rounded-md font-bold text-sm text-green-500 border border-green-500 block tracking-tight">
                          publique
                        </div>
                      ) : (
                        <div className="px-4 pb-1 mt-2 rounded-md font-bold text-sm text-red-500 border border-red-500 block tracking-tight">
                          privée
                        </div>
                      )}
                    </p>
                  </div>
                  <p className="text-sm">{docData?.description}</p>
                  <DisplayCover tab={tab} listId={docData.id} />
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
