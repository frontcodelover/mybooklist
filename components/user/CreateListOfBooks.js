import React, { useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";

export default function CreateListOfBooks({ userid, pseudo }) {
  const [inputs, setInputs] = useState({});
  const db = getFirestore();
  const uuid = nanoid();
  const router = useRouter();

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
      slug : inputs.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "-" + uuid,
      pseudo: pseudo,
      id: uuid,
    });
    window.location.reload(false);
    // router.push(`/list/${inputs.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "-" + uuid}`);
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 p-5 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-3 text-main-color">
          Créer une liste
        </h2>
        <form onSubmit={handleCreateList}>
          <input
            type="text"
            name="name"
            placeholder="Nom de la liste de lecture"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            onChange={handleChange}
          />

          <input
            type="checkbox"
            name="private"
            onChange={handleChange}
            value="true"
            id="private"
            className="mr-2 my-4"
          />
          <label htmlFor="private" className="py-2"> Je souhaite rendre ma liste privée</label>
          <button
            type="submit"
            className="w-full p-2 my-5 bg-purple-500 text-white rounded-md shadow font-semibold"
          >
            Créer une nouvelle liste
          </button>
        </form>
      </div>
    </>
  );
}
