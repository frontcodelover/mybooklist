/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import banniere from "../../public/banniere.jpg";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function BanniereHome() {
  const { user } = useAuth();

  return (
    <>
      <div className="relative mt-4">
        <div className="absolute z-10 top-1/3 w-1/2 left-48">
          <div className="text-5xl font-extrabold text-white pb-5">
            Lisez plus, apprenez plus !
          </div>
          <div className="text-3xl text-white">
            Constituez-vous une liste à votre image en ajoutant tous les livres
            que vous souhaitez lire.
          </div>
          <button className="mt-6 bg-white hover:bg-white/90 font-bold py-2 px-4 rounded-md">
            {!user ? (
              <Link href="/user/signup">
                <a className="text-purple-500">S'incrire gratuitement</a>
              </Link>
            ) : (
              <Link href="/user/dashboard">
                <a className="text-purple-500">Mon profil</a>
              </Link>
            )}
          </button>
        </div>
        <Image src={banniere} layout="responsive" alt="bannierehome" />
      </div>
    </>
  );
}
