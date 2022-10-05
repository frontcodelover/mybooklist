/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import bibliotheBoy from "../../public/bibliotheque-boy.jpg";
import { useAuth } from "../../context/AuthContext";
import banniere from "../../public/banniere.jpg"

export default function TitleHomePage() {
  const { user } = useAuth();

  return (
    <div className="grid md:grid-cols-2 gap-5 h-auto min-h-screen md:px-0 px-5 mt-20 md:mt-0">

      <div className="flex justify-center items-center ">
        <div className="md:grow-0">
          <h1 className="text-5xl font-extrabold lg:text-5xl py-4 text-main-color">
            Lisez plus, apprenez plus !
          </h1>
          <h2 className="text-xl lg:text-3xl py-2 pr-6 text-main-color ">
            Constituez-vous une liste à votre image en ajoutant tous les livres
            que vous souhaitez lire.
          </h2>

          <button className="mt-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">
            {!user ? (
              <Link href="/user/signup">
                <a className="text-white">S'incrire gratuitement</a>
              </Link>
            ) : (
              <Link href="/user/dashboard">
                <a className="text-white">Mon profil</a>
              </Link>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={bibliotheBoy}
          alt="Bibliothèque de garçons"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
