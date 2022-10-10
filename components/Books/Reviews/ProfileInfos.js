import React from 'react'
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function ProfileInfos({userid}) {
  
  const db = getFirestore();
  const bookReviewQuery = useQuery(["users", userid], () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", userid)
    );
    return getDocs(q);
  });

  console.log("USERSS", bookReviewQuery)

  const resultBookReviewQuery =
    (bookReviewQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoadingQuery = bookReviewQuery.isLoading;

  console.log("PROFILE",resultBookReviewQuery)

  return (
    <div>ProfileInfos</div>
  )
}
