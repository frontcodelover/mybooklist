import React from "react";
import lectureFemme from "../../public/lecture-femme.jpg";
import Image from "next/image";


export default function About() {
  return (
    <div className="py-16">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12 lg:block hidden">
            <Image
              src={lectureFemme}
              alt="Lecture de femme"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-main-color font-bold md:text-4xl">
              Votre bibliothéque virtuelle et bien plus !
            </h2>
            <p className="mt-6 text-main-color text-xl">
              Constituez vous une liste à votre image en ajoutant tous les
              livres que vous souhaitez lire.
            </p>
            <p className="mt-4 text-main-color  text-xl">
              Vous souhaitez passer plus de temps à lire ? Grâce à
              ListeDeLecture vous pourrez mesurer efficacement le nombre de
              livres et de pages lues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
