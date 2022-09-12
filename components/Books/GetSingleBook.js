import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Image from "next/image";
import Marion from "../../public/marion.jpg";
import { AiOutlineCheck } from "react-icons/ai";
import { BsListCheck, BsPlay } from "react-icons/bs";
import genBook from "../../public/livre-generique.jpg";
import { getBookFromGoogleBookApi } from "../../services/mapper/mapper";
import GetBooksRelatedByAuthors from "./GetBooksRelatedByAuthors";
import GetBooksByMainCategory from "./GetBooksByMainCategory";
import Bookmarks from "./Bookmarks";
import { useAuth } from "../../context/AuthContext";
import AlreadyRead from "./AlreadyRead";
import ReadingBook from "./ReadingBook";

export default function GetSingleBook({ id }) {
  const [book, setBook] = useState({});
  const [bookDescription, setBookDescription] = useState("");
  const {user} = useAuth();

  useEffect(() => {
    console.log(id);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => {
        const getBook = res.data;
        setBook(getBook);
        if (getBook.volumeInfo.description) {
          setBookDescription(parse(getBook.volumeInfo.description));
        }
      });
  }, [id]);

  // Mapper
  const bookInfos = getBookFromGoogleBookApi(book);

  return (
    <>
      <div className="grid grid-cols-9 my-9">
        <div className="col-span-2">
          {bookInfos?.thumbnail ? (
            <img
              src={bookInfos?.thumbnail}
              alt={bookInfos?.title}
              className="p-4 mb-5 w-52 border rounded-sm"
            />
          ) : (
            <div className="mx-auto mb-5 h-48 ">
              <Image src={genBook} alt={bookInfos?.title} className="h-48 " />
            </div>
          )}
          <p className="flex hover:bg-gray-100 p-2 w-fit rounded-xl">
          <Bookmarks bookid={id} userid={user.uid} />
            {/* <BsListCheck className="mt-1 mr-1" /> Ajouter dans ma liste de
            lecture */}
          </p>
          <p className="flex hover:bg-gray-100 p-2 w-fit rounded-xl">
            <AlreadyRead bookid={id} userid={user.uid} />
          </p>
          <p className="flex hover:bg-gray-100 p-2 w-fit rounded-xl">
            <ReadingBook bookid={id} userid={user.uid} />
            {/* <BsPlay className="mt-1 mr-1" /> Je suis entrain de le lire */}
          </p>
        </div>
        <div className="col-span-7">
          <div className="flex">
            <div className="flex flex-col rounded-sm w-full">
              <h1 className="text-5xl font-semibold mb-3">{bookInfos?.title}</h1>
              {bookInfos?.subtitle && (
                <h2 className="text-3xl">{bookInfos?.subtitle}</h2>
              )}
              {bookInfos?.authors ? (
                bookInfos?.authors.map((author) => (
                  <>
                    <p key={author}>Un livre de {author}</p>
                  </>
                ))
              ) : (
                <p>Auteur inconnu</p>
              )}
              <p>Edition : {bookInfos?.publisher}</p>
              <p>
                Année de publication :
                {bookInfos?.publishedDate
                  ? " " + bookInfos?.publishedDate.substring(0, 4)
                  : " inconnue"}
              </p>
            </div>
          </div>
          {bookDescription && (
            <div className="my-9">
              <h3 className="text-3xl font-semibold mb-3 border-b pb-2 border-gray-500">
                Description
              </h3>
              <p>{bookDescription}</p>
            </div>
          )}
          <div>
            {bookInfos?.categories ? (

                  <GetBooksByMainCategory category={bookInfos.categories[0]} />
             
            ) : (
              <p>Aucune suggestion de lecture</p>
            )}
            
          </div>
          <div className="my-9">
            {bookInfos?.authors ? (
              bookInfos?.authors?.map((author) => (
                <>
                  <GetBooksRelatedByAuthors author={author} />
                </>
              ))
            ) : (
              <p>Auteur inconnu</p>
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
                alt="Marion"
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
      </div>
    </>
  );
}
