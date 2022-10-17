import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function ProfileInfos({ userid }) {
  const db = getFirestore();
  const userReview = useQuery(["users", userid], () => {
    const q = query(collection(db, "users"), where("uid", "==", userid));
    return getDocs(q);
  });

  const resultUserReviewQuery =
    (userReview.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoadingQuery = userReview.isLoading;

  return (
    <>
      {resultUserReviewQuery &&
        resultUserReviewQuery.map((infos) => <>{infos.prenom}</>)}
    </>
  );
}
