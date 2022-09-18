import React, {useState} from 'react'
import { getFirestore } from 'firebase/firestore'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from 'react';

export default function GetAllBookListsForUser({ userid }) {
    const [bookLists, setBookLists] = useState([])
    const db = getFirestore()

    useEffect(() => {
        

    const getBookLists = async () => {
        const q = query(collection(db, "publiclist"), where("userid", "==", userid));

        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc) => {
            setBookLists((oldValues) => [...oldValues, doc.data()])
        })
    }

        getBookLists()
    }, [db, userid])

    console.log(bookLists)

    return (
      <>
      {/* <div>{bookLists?.map(bookList => (
          <div key={bookList.id}>
              <h1>{bookList.name}</h1>
          </div>
        ))}</div> */}
        </>
  )
}
