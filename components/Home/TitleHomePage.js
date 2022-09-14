/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import bibliotheBoy from "../../public/bibliotheque-boy.jpg";

export default function TitleHomePage() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-5 h-screen md:px-0 px-5 mt-20 md:mt-0">
      <div className="md:items-center md:justify-center md:hidden">
        <Image
          src={bibliotheBoy}
          alt="Bibliothèque de garçons"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
      <div className="md:flex md:justify-center md:items-center ">
        <div className="md:grow-0">
          <h1 className="text-2xl font-bold lg:text-5xl py-4 text-main-color">
            Lisez plus, apprenez plus !
          </h1>
          <h2 className="text-xl lg:text-3xl py-2 pr-6 text-main-color ">
            Constituez vous une liste à votre image en ajoutant tous les livres
            que vous souhaitez lire.
          </h2>

          <button className="mt-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">
            <Link href="/user/signup">
              <a className="text-white">S'incrire gratuitement</a>
            </Link>
          </button>
        </div>
      </div>
      <div className="md:items-center md:justify-center md:flex hidden">
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
