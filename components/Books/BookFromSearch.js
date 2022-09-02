import React from "react";

export default function BookFromSearch({ setSearchTerm, searchTerm }) {
  return (
    <div className="bg-gray-100 my-9 rounded px-5 py-6">
      {/* <from className="rounded px-3 mb-4"> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="username"
          >
            Indiquer un titre, un auteur
          </label>
        <div className="pb-1">
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            />
        </div>
            </div>  

        
      {/* </from> */}
    </div>
  );
}
