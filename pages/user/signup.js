/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import womanread from "../../public/woman-read.jpg";

const Signup = () => {
  const router = useRouter();
  const { user, signUp } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(data.email, data.password);
      router.push("/user/firststep");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto h-screen my-auto flex justify-center align-middle">
        <div className="flex justify-center px-6 my-auto ">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
              <Image
                src={womanread}
                alt="Bibliothèque"
                className="rounded-l-lg"
              />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 pb-2 text-2xl text-center font-semibold">
                Créer un compte
              </h3>
              <div className="px-2 mb-4 text-center">
                et ajouter tous vos livres dans votre liste de lecture !
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSignup}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Votre email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Votre email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Mot de passe
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <p className="text-xs italic text-red-500">
                    Merci de choisir un mot de passe d'au moins 6 caractères.
                  </p>
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Créer un compte
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center flex flex-col">
                  Vous avez déjà un compte utilisateur ?
                  <Link href="/user/login">
                    <p className="inline-block text-purple-500 align-baseline hover:text-purple-800">
                      Connectez-vous dès maintenant !
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
