import React from "react";

export default function StatsBookmarks({ bookNumber }) {
  return (
    <div className="mt-2 mb-5">
      {bookNumber > 0 ? (
        <>
          <div className="outline-green-300 outline-8 outline w-32 h-32 rounded-full mx-auto">
            <div className="flex flex-col items-center w-32 h-32 text-center">
              <p className="text-4xl font-bold pt-5 pb-3">{bookNumber}</p>
              <p className="text-sm font-normal">Livre(s) ajouté(s)</p>
            </div>
          </div>
        </>
      ) : (
        <p>Vous avez {bookNumber} livre dans votre liste 😞</p>
      )}
    </div>
  );
}
