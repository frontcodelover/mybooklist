/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React, { useState } from "react";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

export default function Modal() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="flex">
        <div className="mt-1 pr-1">
          <div className="flex">
            <BsFillBookmarkPlusFill className="mt-1" />
            <button
              className=" text-black flex text-sm
        outline-none cursor-pointer font-semibold marker:text-transparent leading-5 pl-1"
              type="button"
              onClick={() => setVisible(true)}
            >
              Ajouter à ma liste de lecture
            </button>
          </div>
        </div>
      </div>

      {visible ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex m-4">
                  <div className="flex justify-end w-full">
                    <button
                      className="h-7 w-7 rounded-lg hover:bg-gray-200 border-gray-200 text-gray-400 hover:text-gray-600 font-bold border"
                      onClick={() => setVisible(false)}
                    >
                      X
                    </button>
                  </div>
                </div>
                <h2 className="text-2xl text-center font-bold">
                  Rejoignez la communauté
                </h2>
                <div className="border-b border-gray-200 py-5 w-3/4 mx-auto"></div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-600 text-lg leading-relaxed">
                    Vous disposez d'un compte ou vous souhaitez en créer un ?
                    <br />
                    Connectez-vous ou inscrivez-vous gratuitement pour ajouter
                    des livres à vos listes de lectures et découvrir les
                    conseils de nos membres.
                  </p>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Link href="/user/login">
                    <button
                      className="text-main-color border background-transparent font-bold uppercase px-6 py-3 text-sm rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setVisible(false)}
                    >
                      <a>se connecter</a>
                    </button>
                  </Link>
                  <Link href="/user/signup">
                    <button
                      className="text-white bg-purple-500 active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setVisible(false)}
                    >
                      <a>s'inscrire</a>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
