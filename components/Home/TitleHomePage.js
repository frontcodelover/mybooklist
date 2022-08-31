import React from "react";
import Link from "next/link";
import Image from "next/image";
import bibliotheBoy from "../../public/bibliotheque-boy.jpg"

export default function TitleHomePage() {
  return (
    <div className="grid grid-cols-2 gap-5 h-quarter">
      <div className="flex justify-center items-center">
        <div className="grow-0">
          <h1 className="text-2xl font-bold lg:text-5xl py-4">
            Lisez plus, apprenez plus !
          </h1>
          <h2 className="text-xl lg:text-3xl py-2">
            Constituez vous une liste à votre image en ajoutant tous les livres
            que vous souhaitez lire.
          </h2>
          
          <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/user/signup">
              <a className="text-white">S'incrire gratuitement</a>
            </Link>
          </button>
        </div>
          </div>
          <div className="items-center justify-center flex">
              <Image src={bibliotheBoy} alt="Bibliothèque de garçons" loading="lazy" className="rounded-xl" />
              </div>
              
    </div>
  );
}
