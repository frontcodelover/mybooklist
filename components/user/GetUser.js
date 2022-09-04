import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { getFirestore } from "firebase/firestore";
import Image from "next/image";
import bookPortrait from "../../public/book-portrait.jpg";

export default function GetUser() {
  const { user } = useAuth();
  const db = getFirestore();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(event)
  };
  console.log(inputs);
  const handleSubmit = async (event) => {
    event.preventDefault();

    await setDoc(doc(db, "users", user.uid), {
      pseudo: inputs.pseudo,
      prenom: inputs.prenom,
      age: inputs.age,
      nom: inputs.nom,
      ville: inputs.ville,
      genre: inputs.genre,
      litterature: inputs.litterature,
      phrase: inputs.phrase,
      uid: user.uid,
    });
  };
  console.log(inputs);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-4/4 lg:w-11/12 flex">
            <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
              <Image
                src={bookPortrait}
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              />
            </div>
            {/* <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style="background-image: url('https://source.unsplash.com/oWTW-jNGl9I/600x800')"
            ></div> */}

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl font-semibold">
                  Et si on fait connaissance ?
                </h3>
                <p className="mb-4 text-sm text-gray-700">
                  Remplissez les informations de votre profil
                </p>
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Prénom
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="prenom"
                    type="text"
                    placeholder="Entrez votre prénom"
                    name="prenom"
                    onChange={handleChange}
                    value={inputs.prenom || ""}
                    required
                  />

                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Pseudo
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="pseudo"
                    type="text"
                    placeholder="Entrez votre pseudo"
                    name="pseudo"
                    onChange={handleChange}
                    value={inputs.pseudo || ""}
                    required
                  />
                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Votre date de naissance
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="age"
                    type="date"
                    name="age"
                    onChange={handleChange}
                    value={inputs.age || ""}
                    required
                  />
                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Votre nom
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="nom"
                    type="text"
                    placeholder="Entrez votre nom"
                    name="nom"
                    onChange={handleChange}
                    value={inputs.nom || ""}
                    required
                  />
                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Votre ville
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="ville"
                    type="text"
                    placeholder="Entrez votre nom"
                    name="ville"
                    onChange={handleChange}
                    value={inputs.ville || ""}
                    required
                  />
                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Vous êtes ?
                  </label>
                  <select
                    name="genre"
                    value={inputs.genre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  >
                    <option value="Femme">une femme</option>
                    <option value="Homme">un homme</option>
                    <option value="Non binaire">non binaire</option>
                  </select>
                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Quel genre de livres aimez-vous lire ?
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="litterature"
                    type="text"
                    placeholder="Ajoutez un style de lecture"
                    name="litterature"
                    onChange={handleChange}
                    value={inputs.litterature || ""}
                    required
                  />
                  <label className="block mb-2 text-sm font-bold text-gray-700 mt-2">
                    Votre devise, un proverbe ou une phrase ?
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="phrase"
                    type="text"
                    placeholder="Ajoutez un style de lecture"
                    name="phrase"
                    onChange={handleChange}
                    value={inputs.phrase || ""}
                    required
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    C'est parti !
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div class="text-center text-sm">
                  Nous gardons vos données personnelles, elles ne sont pas
                  revendus ni cédées à des tiers.
                  <br />
                  Votre pseudo, la ville, le genre littéraire, la devise
                  et l'age sont utilisés sur votre espace public vous pourrez les modifier plus tard.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}