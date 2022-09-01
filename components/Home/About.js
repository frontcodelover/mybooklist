import React from 'react'
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import lectureFemme from "../../public/lecture-femme.jpg";
import Image from "next/image";

export default function About() {
    const { user, logout } = useAuth();
  return (
    <div className="pb-8">  
  <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <Image src={lectureFemme} alt="Lecture de femme" loading="lazy" className="rounded-xl"/>
          
        </div>
        <div className="md:7/12 lg:w-6/12">
          <h2 className="text-xl text-gray-900 font-bold md:text-4xl">Votre bibliothéque virtuelle et bien plus !</h2>
          <p className="mt-6 text-gray-600">Constituez vous une liste à votre image en ajoutant tous les livres que vous souhaitez lire.</p>
                <p className="mt-4 text-gray-600">Vous souhaitez passer plus de temps à lire ? Grâce à ListeDeLecture vous pourrez mesurer efficacement le nombre de livres et de pages lues.</p>
                <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  {user ? (
                    <>
                      <Link href="user/dashboard">
                        <a>Voir votre tableau de bord</a>
                      </Link>
                    </>
                  ):
                    <Link href="/user/signup">
                    <a className="text-white">S'incrire</a>
                  </Link>
                    }
                </button>
        </div>
      </div>
  </div>
</div>
  )
}
