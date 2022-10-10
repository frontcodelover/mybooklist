//! A REFAIRE avec les datas
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import StarsReview from './StarsReview';
import ProfileInfos from './ProfileInfos';

export default function DisplayReview({bookid}) {

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

  console.log(resultBookReviewQuery)

  return (
    <>
      {isLoadingQuery ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-3 text-main-color">
            Mes listes de lecture
          </h2>
          {resultBookReviewQuery.length ? (
            resultBookReviewQuery?.map((review) => {
              return (
               <>
               <div className="p-6 bg-gray-200/50 border-t-4 border-main-color">
                <div className="flex mb-3">

               <div className="p-3">
                    <span className="font-semibold"> Marion T.</span> a écrit le <span className='mr-2'>



                    <ProfileInfos userid={review.userid} />
                    {review.readed.toDate().toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
                <StarsReview note={review.note} />
                <p className="font-semibold text-lg mb-3">
                  {review.title}
                </p>
                <p className="text-justify">
                {review.content}
                </p>
               </div>
               </>
              );
            })
          ) : (
            <p>Aucune crique pour le moment. Vous avez lu ce livre ? Ajouter votre critique !</p>
          )}
        </div>
      )}
    </>
  );
}
