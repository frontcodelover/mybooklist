import React from "react";

export default function Search() {
  return (
    <div className="grow">
      <input
        type="text"
        placeholder="Rechercher un livre"
        className="border rounded-full pb-1 px-3 mx-auto w-full"
      />
    </div>
  );
}
