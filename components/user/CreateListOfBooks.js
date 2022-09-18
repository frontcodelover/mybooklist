import React, { useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default function CreateListOfBooks({ userid }) {
  const [inputs, setInputs] = useState({});
  const db = getFirestore();
  const uuid = nanoid();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    const list = doc(db, "publiclist", uuid);
    await setDoc(list, {
      name: inputs.name,
      date: new Date(),
      private: inputs.private === "true" ? true : false,
      userid: userid,
      id: uuid,
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-3 text-main-color">
          Créer une liste
        </h1>
        <form onSubmit={handleCreateList}>
          <input
            type="text"
            name="name"
            placeholder="Nom de la liste de lecture"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
          />

          <input
            type="checkbox"
            name="private"
            onChange={handleChange}
            value="true"
            id="private"
          />
          <label htmlFor="private"> Je souhaite rendre ma liste privée</label>
          <button
            type="submit"
            className="w-full p-2 mt-2 bg-main-color text-white rounded-md"
          >
            Créer
          </button>
        </form>
      </div>
    </>
  );
}
