import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function GetAllBookListsForUser({ userid, bookid }) {
  const db = getFirestore();

  const bookListQuery = useQuery(["bookList", userid], () => {
    const q = query(
      collection(db, "publiclist"),
      where("userid", "==", userid)
    );
    return getDocs(q);
  });
  const bookList =
    (bookListQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoading = bookListQuery.isLoading;

  const bookAddedQuery = useQuery(["bookList", userid, bookid], () => {
    const q = query(
      collection(db, "publiclist"),
      where("bookid", "array-contains", bookid),
      where("userid", "==", userid)
    );
    return getDocs(q);
  });
  const bookAddedDocList = (bookAddedQuery.data?.docs || []).map((doc) =>
    doc.data()
  );
  const queryClient = useQueryClient();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return bookList.map((docData) => {
    const isChecked = bookAddedDocList
      .map((bookDoc) => bookDoc.id)
      .includes(docData.id);
    return (
      <div key={docData.id} className="pl-2 py-2">
        <input
          id="purple-checkbox"
          type="checkbox"
          onChange={async (e) => {
            const bookListRef = doc(db, "publiclist", docData.id);

            await updateDoc(bookListRef, {
              bookid: isChecked ? arrayRemove(bookid) : arrayUnion(bookid),
            });

            queryClient.invalidateQueries(["bookList", userid, bookid]);
          }}
          checked={isChecked}
          className="w-4 h-4 -mt-1 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="purple-checkbox"
          className="ml-2 text-sm text-gray-900 dark:text-gray-300"
        >
          {docData.name}
        </label>
      </div>
    );
  });
}
