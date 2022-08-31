import React from "react";
import Slideshow from "./Slideshow";

export default function Teams() {
    return (
        <>
            <Slideshow />
            
    <div className="py-20">
      <div className="container mx-auto px-6 md:px-12 xl:px-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">
            Ce qu'ils pensent de ListeDeLecture
          </h2>
          <p className="text-gray-600 lg:w-8/12 lg:mx-auto">
            Nous avons demandé à nos membres ce qu'ils pensaient de
            ListeDeLecture
          </p>
        </div>
        <div className="grid gap-12 items-center md:grid-cols-3">
          <div className="space-y-4 text-center">
            <div>
              <span className="block text-base text-gray-500">
                "Grâce à ListeDeLecture j'ai réussi à me constitué une vraie
                liste de livres à lire. D'ailleurs, dès que j'en vois un, je
                l'ajoute automatiquement dans ma liste."
              </span>
            </div>
          </div>
          <div className="space-y-4 text-center">
            <div>
              <span className="block text-base text-gray-500">
                "Avant d'utiliser ce site je lisais à peine un livre par an...
                Depuis j'ai retrouvé la motivation et je dévore désormais 1
                livre chaque mois !"
              </span>
            </div>
          </div>
          <div className="space-y-4 text-center">
            <div>
              <span className="block text-base text-gray-500">
                "J'aime beaucoup le fait de pouvoir partager ma liste de lecture
                avec mes amies et mes collègues, d'ailleurs elles sont devenues
                accro !"
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
  );
}
