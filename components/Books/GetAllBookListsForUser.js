import React, {useState} from 'react'
import { getFirestore } from 'firebase/firestore'
import { collection, query, where, getDocs, arrayRemove, arrayUnion } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query';

export default function GetAllBookListsForUser({ userid, bookid }) {
    // const [bookLists, setBookLists] = useState([])
    const [isBookmarked, setIsBookmarked] = useState(false);
    const db = getFirestore()

    const bookListQuery = useQuery(["bookList", userid], () => {
        const q = query(collection(db, "publiclist"), where("userid", "==", userid));
        
        return getDocs(q);
        })
        const bookLists = bookListQuery.data?.docs.map((doc) => doc.data())

        const isLoading = bookListQuery.isLoading

        let tabListIds = []


        !isLoading ? 
        bookLists?.map((bookList) => {
            tabListIds.push(bookList.id)
        })
        :
        console.log("Loading")
        
        console.log("TAB",tabListIds)
        console.log("LIST",bookLists)

        const handleBookmark = async (e) => {
            e.preventDefault();
            const userDoc = doc(db, "users", userid);
            await updateDoc(userDoc, {
              bookid: arrayUnion(bookid),
            });
            setIsBookmarked(true);
            const list = doc(db, "publiclist", uuid);
            await setDoc(list, {
              bookid: arrayUnion(bookid),
            });
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

          {!isLoading ? (
              bookLists?.map((bookList) => (
                <div key={bookList.id} className='pl-2'>
                    <div className="text-sm">{bookList.name}</div>
                </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
                

        </>
  )
}
