import React from "react";

export default function BookFromSearch({ setSearchTerm, searchTerm }) {
  return (
    <div className="bg-gray-50 my-9 px-5 py-6">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-md font-semibold mb-2"
          htmlFor="username"
        >
          Rechercher un titre, un auteur...
        </label>
        <div className="pb-1">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
         
        </div>
      </div>
    </div>
  );
}
