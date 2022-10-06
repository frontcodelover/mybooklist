import React from "react";
import BookSelectionDetail from "./BookSelectionDetail";

export default function BookSelection({ BooksSelectedDatas }) {
  return (
    <>
      <div className="mx-auto container p-5">
        <div className="grid lg:grid-cols-6 items-center">
          <div className="lg:col-span-2 col-span-6 py-6 lg:py-0">
            <h3 className="text-main-color font-extrabold lg:text-5xl text-4xl tracking-tight">
              Le coup de coeur
            </h3>
            <p className="text-main-color lg:text-2xl text-xl tracking-tight font-light">
              Découvrez le livre coup de coeur du mois.
            </p>
          </div>
          <div className="col-span-4">
            {BooksSelectedDatas.map((book) => (
              <BookSelectionDetail key={book} bookid={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
