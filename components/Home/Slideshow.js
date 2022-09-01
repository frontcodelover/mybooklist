import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import isabelle from "../../public/isabelle.jpg";
import marion from "../../public/marion.jpg";
import remy from "../../public/remy.jpg";  

const Slideshow = () => {
  //Array of Images
  const images = [
    {
      image: marion,
      avis: `"Grâce à ListeDeLecture j'ai réussi à me constitué une vraie
      liste de livres à lire. D'ailleurs, dès que j'en vois un, je
      l'ajoute automatiquement dans ma liste."`,
      name: "Marion T.",
    },
    {
      image: isabelle,
      avis : `"Avant d'utiliser ce site je lisais à peine un livre par an...
      Depuis j'ai retrouvé la motivation et je dévore désormais 1
      livre chaque mois !"`,
      name : "Isabelle B.",
    },
    {
      image: remy,
      avis: `"J'aime beaucoup le fait de pouvoir partager ma liste de lecture
      avec mes amies et mes collègues, d'ailleurs elles sont devenues
      accro !"`,
      name : "Rémy G.",
    },
  ];

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
  };
  return (
    <div className="mx-auto">
      <div className="w-5/6 mx-auto">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} className="md:flex justify-center w-full h-full">
            <div className="mx-auto w-48 md:py-20 lg:py-0">
            <Image
              className="object-cover rounded-full"
              src={each.image}
              />
              </div>
            <div className="flex flex-col items-center">
              <p className="text-center text-xl py-5 lg:w-9/12 w-10/12">{each.avis}</p>
              <p className="text-center text-xl font-bold">{each.name}</p>
            </div>

          </div>
        ))}
        </Zoom>
        </div>
    </div>
  );
};

export default Slideshow;
