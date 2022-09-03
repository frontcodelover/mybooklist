import React, { useEffect, useState } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {BsFillBookmarkPlusFill, BsFillBookmarkDashFill} from 'react-icons/bs';
import Link from 'next/link';

export default function Bookmarks({ bookid, userid }) {
  const db = getFirestore();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await doc(db, "users", userid)
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setCurrentUser(user.data());
        const userData = user.data();
        if (userData?.bookid?.includes(bookid)) {
          userData.bookid.forEach((id) => {
            if (id === bookid) {
              setIsBookmarked(true);
            }
          }
          )
        }
      }
    };
    getUser();
  }, []);

  const handleBookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid)
    await updateDoc(userDoc, {
      bookid: arrayUnion(bookid),
    });
    setIsBookmarked(true);
  };

  const handleUnbookmark = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", userid)
    await updateDoc(userDoc, {
      bookid: arrayRemove(bookid),
    });
    setIsBookmarked(false);
  };


  return (
    <>
      {currentUser ? (
        <button
        onClick={isBookmarked ? handleUnbookmark : handleBookmark}
        className="text-base">
      {isBookmarked ? <p className='text-sm font-semibold text-purple-500 flex'><div className='mt-1 pr-1'><BsFillBookmarkDashFill /></div> Déjà dans ma liste de lecture</p> : <p className='text-sm font-semibold text-green-500 flex'><div className='mt-1 pr-1'><BsFillBookmarkPlusFill /></div> Ajouter à ma liste de lecture</p>}
    </button>
      ) : (
          <Link href="/user/firststep">
            <a className='text-sm font-semibold text-red-500'>Remplissez votre profil afin d'ajouter des livres dans votre bibliothèque</a>
          </Link>
      )}
    </>
      )
}

// import React, { useEffect, useState } from "react";
// import {
//   doc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

// export default function Bookmarks({ bookid, userid }) {
//   console.log(bookid, userid);
//   const db = getFirestore();
//   const [user, setUser] = useState({});
//   const [bookmarked, setBookmarked] = useState("");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   let tabbook = [];

//   useEffect(() => {
//     const getUser = async () => {
//       const usersCollection = collection(db, "users");
//       const queriedCurrentUser = query(
//         usersCollection,
//         where("uid", "==", userid)
//       );
//       const queriedCurrentUserResult = await getDocs(queriedCurrentUser);
//       queriedCurrentUserResult.forEach((doc) => {
//         setUser(doc.data());
//         setIsLoaded(true);
//       });

//       if (isLoaded) {
//         handleBookmark();
//       }
//     };

//     bookmarkeddd();

//     getUser();
//   }, [userid, bookid, isLoaded]);

//   function bookmarkeddd() {
//     try {
//       if (user.bookmarks.includes(bookid)) {
//         setBookmarked("bookmarked");
//       } else {
//         setBookmarked("");
//       }
//     } catch {
//       setBookmarked("");
//     }
//   }

//   const handleBookmark = () => {
//     user?.bookid?.map((books) => {
//       tabbook.includes(bookid) ? setBookmarked("true") : setBookmarked("false");
//       tabbook.push(books);
//     });
//   };

//   const handleAdd = async (event) => {
//     event.preventDefault();
//     try {
//       const addBookToCurrentUser = doc(db, "users", userid);
//       await updateDoc(addBookToCurrentUser, { bookid: arrayUnion(bookid) });
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching user data");
//     }
//     setIsBookmarked(true);
//     setBookmarked("bookmarked");
//   };

//   const handleRemove = async (event) => {
//     event.preventDefault();
//     try {
//       const removeBookToCurrentUser = doc(db, "users", userid);
//       await updateDoc(removeBookToCurrentUser, { bookid: arrayRemove(bookid) });
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching user data");
//     }
//     setIsBookmarked(false);
//     setBookmarked("");
//   };

//   return (
//     <>
//       <button
//         onClick={isBookmarked ? handleRemove : handleAdd}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         {bookmarked}
//       </button>
//     </>
//   );
// }
