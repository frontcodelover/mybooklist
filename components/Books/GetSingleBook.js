import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Image from "next/image";
import Marion from "../../public/marion.jpg";
import { AiOutlineCheck } from "react-icons/ai";
import { BsListCheck, BsPlay } from "react-icons/bs";
import genBook from "../../public/livre-generique.jpg";

export default function GetSingleBook({ id }) {
  const [bookInfos, setBookInfos] = useState({});
  const [bookDescription, setBookDescription] = useState("");

  useEffect(() => {
    console.log(id);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => {
        const getBook = res.data;
        console.log(getBook);
        setBookInfos(getBook);
        if (getBook.volumeInfo.description) {
          setBookDescription(parse(getBook.volumeInfo.description));
        }
      });
  }, [id]);

  return (
    <>
      <div className="grid grid-cols-9">
        <div className="col-span-2">
          {bookInfos.volumeInfo?.imageLinks ? (
            <img
              src={bookInfos.volumeInfo?.imageLinks.thumbnail}
              alt={bookInfos.volumeInfo?.title}
              className="mx-auto mb-5 h-48"
            />
          ) : (
              <div className="mx-auto mb-5 h-48">
            <Image src={genBook} alt={bookInfos.volumeInfo?.title} className="h-48"/>
            </div>
          )}

          <p className="flex hover:bg-gray-100 p-2 w-fit rounded-xl">
            <BsListCheck className="mt-1 mr-1" /> Ajouter dans ma liste de
            lecture
          </p>
          <p className="flex hover:bg-gray-100 p-2 w-fit rounded-xl">
            <AiOutlineCheck className="mt-1 mr-1" /> J'ai déjà lu ce livre
          </p>
          <p className="flex hover:bg-gray-100 p-2 w-fit rounded-xl">
            <BsPlay className="mt-1 mr-1" /> Je suis entrain de le lire
          </p>
        </div>
        <div className="col-span-7">
          <div className="flex">
            <div className="flex flex-col">
              <h1 className="text-5xl font-semibold">
                {bookInfos.volumeInfo?.title}
              </h1>
              {bookInfos.volumeInfo?.subtitle && (
                <h2 className="text-3xl">{bookInfos.volumeInfo?.subtitle}</h2>
              )}

              {bookInfos.volumeInfo?.authors ? (
                bookInfos.volumeInfo?.authors.map((author) => (
                  <p key={author}>Un livre de {author}</p>
                ))
              ) : (
                <p>Auteur inconnu</p>
              )}
              <p>Edition : {bookInfos.volumeInfo?.publisher}</p>
              <p>
                Année de publication :
                {bookInfos.volumeInfo?.publishedDate
                  ? " " + bookInfos.volumeInfo?.publishedDate.substring(0, 4)
                  : " inconnue"}
              </p>
            </div>
          </div>
          {bookDescription && (
            <div className="mt-4">
              <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
                Description
              </h3>
              <p>{bookDescription}</p>
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
              Les dernières critiques
            </h3>
            <div className="flex mb-3">
              <Image
                src={Marion}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="p-3">
                <span className="font-semibold"> Marion T.</span> a écrit le 4
                septembre 2022
              </div>
            </div>
            <p className="font-semibold text-lg mb-3">Titre de la critique</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              rutrum ipsum nec dolor aliquet semper. Vestibulum facilisis mi eu
              urna malesuada, eget sollicitudin nunc consequat. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Nulla condimentum lorem vel neque accumsan dictum.
              Duis a neque elementum, feugiat justo vitae, volutpat est. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Nunc a leo nec lacus dapibus ultricies eget in
              ipsum. Etiam ac euismod nisi, a aliquam justo. Quisque vitae leo
              sed sapien gravida rutrum a sed massa. Etiam libero magna, viverra
              a porta a, volutpat vel odio. Mauris condimentum consectetur
              turpis, eget accumsan elit elementum at. Aliquam erat volutpat.
              Sed varius odio ac ligula ullamcorper consequat ac at elit. Fusce
              fringilla lectus vel turpis consequat posuere. Mauris et nunc et
              sem scelerisque consectetur id ac erat. Mauris at consectetur ex.
              Sed porta dapibus libero, in fringilla ex blandit in. Praesent
              ultricies euismod neque, sed malesuada sem dignissim quis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
