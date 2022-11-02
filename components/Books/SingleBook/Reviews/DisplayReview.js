//! A REFAIRE avec les datas
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import StarsReview from "./StarsReview";
import ProfileInfos from "./ProfileInfos";
import GetImage from "./GetImage";

export default function DisplayReview({ bookid }) {
  const db = getFirestore();
  const bookReviewQuery = useQuery(["bookreview", bookid], () => {
    const q = query(
      collection(db, "booksreview"),
      where("bookid", "==", bookid)
    );
    return getDocs(q);
  });
  const resultBookReviewQuery =
    (bookReviewQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoadingQuery = bookReviewQuery.isLoading;

  console.log(resultBookReviewQuery);

  return (
    <>
      {isLoadingQuery ? (
        <div>Loading...</div>
      ) : (
          <div className="pt-4">
             <h3 className="text-2xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color tracking-tight">
                Les dernières critiques
              </h3>
          {resultBookReviewQuery.length ? (
            resultBookReviewQuery?.map((review) => {
              return (
                <>
                  
                  <div className="p-10 border-b-2 border-t border-r-2 border-l-2 border-l-slate-100 border-r-slate-100 border-t-slate-100 border-slate-200/90 my-14 shadow-xl rounded-xl">
                    <div className="flex mb-3">
                      <GetImage userid={review.userid} size={50} />
                      <div className="p-3">
                        <span className="font-semibold">
                          {" "}
                          <ProfileInfos userid={review.userid} />
                        </span>{" "}
                        a écrit le <span className="mr-2">{review.readed}</span>
                      </div>
                    </div>
                    <StarsReview note={review.note} />
                    <p className="font-bold text-lg mb-3">{review.title}</p>
                    <p className="text-justify">{review.content}</p>
                  </div>
                </>
              );
            })
          ) : (
            <p>
              Aucune crique pour le moment. Vous avez lu ce livre ? Ajoutez
              votre critique !
            </p>
          )}
        </div>
      )}
    </>
  );
}
