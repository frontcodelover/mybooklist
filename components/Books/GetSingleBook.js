import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marion from "../../public/marion.jpg";
import genBook from "../../public/livre-generique.jpg";
import { getBookFromGoogleBookApi } from "../../services/mapper/mapper";
import GetBooksRelatedByAuthors from "./GetBooksRelatedByAuthors";
import GetBooksByMainCategory from "./GetBooksByMainCategory";
import { useAuth } from "../../context/AuthContext";
import AlreadyRead from "./AlreadyRead";
import ReadingBook from "./ReadingBook";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../feature/book/bookSlice";
import parse from "html-react-parser";
import BookmarkBooksList from "./BookmarkBooksList";
import Modal from "../Layout/modal";
import DisplayReview from "./Reviews/DisplayReview";

export default function GetSingleBook({ data, id }) {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const { book: bookState } = useSelector((state) => state);
  const { list: bookList, status: bookStatus } = bookState;

  useEffect(() => {
    dispatch(getBook({ bookid: id }));
  }, [dispatch, id]);

  // Mapper
  const bookInfos = getBookFromGoogleBookApi(data);

  return (
    <>
      <Head>
        <title>
          {bookInfos?.title} Livre de {bookInfos?.authors} - ListeDeLecture
        </title>
        <meta
          name="description"
          content="Mybooklist vous permet de garder une trace de vos lectures"
        />
      </Head>

      <div className="mx-auto bg-[#2b3055] flex py-20 my-5 border-b-4 border-[#7c61a3]/50">
        <div className="container lg:max-w-screen-xl mx-auto flex px-2">
          {bookInfos?.thumbnail ? (
            <img
              src={bookInfos?.thumbnail}
              alt={bookInfos?.title}
              className="h-48 w-auto md:h-64 md:w-48 object-cover shadow-lg pl-4"
            />
          ) : (
            <div className="">
              <Image src={genBook} alt={bookInfos?.title} className="h-48 w-auto md:h-64 md:w-48 object-cover shadow-lg pl-4" />
            </div>
          )}

          <div className="mx-12">
            <h1 className="text-2xl md:text-5xl font-bold mb-2 text-white tracking-tight">
              {bookInfos?.title}
            </h1>
            {bookInfos?.subtitle && (
              <h2 className="text-xl text-white/90 mb-3">
                {bookInfos?.subtitle}
              </h2>
            )}
            <div className="md:text-2xl text-md text-white/80 tracking-tight">
              {bookInfos?.authors ? (
                bookInfos?.authors.map((author) => (
                  <>
                    <div key={author}>Un livre de {author}</div>
                  </>
                ))
              ) : (
                <p className="text-white/50">Auteur inconnu</p>
              )}
            </div>
            <p className="text-white/50 font-light">Edition : {bookInfos?.publisher}</p>
            <p className="text-white/50 font-light">
              Année de publication :
              {bookInfos?.publishedDate
                ? " " + bookInfos?.publishedDate.substring(0, 4)
                : " inconnue"}
            </p>
          </div>
        </div>
      </div>

      <div className="my-9 flex flex-col sm:flex-row lg:max-w-screen-xl mx-auto">
        <div className="sm:flex-none sm:w-56">
          <div className="border-r border-main-color/20">
            <div className="flex flex-col w-fit p-4">
              {user ? (
                <>
                  <div className="pb-5">
                  <BookmarkBooksList bookid={id} userid={user?.uid} />
                  </div>
                  <div>
                    <AlreadyRead bookid={id} userid={user?.uid} />
                  </div>
                </>
              ) : (
                <Modal />
              )}
            </div>

            {bookInfos?.isbn13 ? (
              <div className="flex hover:bg-gray-100 p-4 w-fit rounded-xl">
                <Link
                  href={`https://www.amazon.fr/s?k=${bookInfos?.isbn13}&tag=avantjetaisriche-21`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <a
                    target="_blank"
                    className="text-sm font-semibold text-red-500 flex"
                  >
                    <div className="mt-1 pr-1">
                      <AiOutlineShoppingCart />
                    </div>
                    Acheter ce livre sur Amazon
                  </a>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="sm:grow h-auto  p-5">
          {bookInfos.description && (
            <div className="mb-9">
              <h3 className="text-3xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color">
                Résumer
              </h3>
              <div className="lettrine text-justify text-lg tracking-tight">
                {parse(bookInfos.description)}
              </div>
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
              <h3 className="text-3xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color">
                Les dernières critiques
              </h3>
              <DisplayReview bookid={id} />
              <div className="p-6 bg-gray-200/50 border-t-4 border-main-color">
                <div className="flex mb-3">
                  <Image
                    src={Marion}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="Marion"
                  />
                  <div className="p-3">
                    <span className="font-semibold"> Marion T.</span> a écrit le
                    4 septembre 2022
                  </div>
                </div>
                <p className="font-semibold text-lg mb-3">
                  Titre de la critique
                </p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque rutrum ipsum nec dolor aliquet semper. Vestibulum
                  facilisis mi eu urna malesuada, eget sollicitudin nunc
                  consequat. Orci varius natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Nulla condimentum
                  lorem vel neque accumsan dictum. Duis a neque elementum,
                  feugiat justo vitae, volutpat est. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Nunc a leo nec lacus dapibus ultricies eget in
                  ipsum. Etiam ac euismod nisi, a aliquam justo. Quisque vitae
                  leo sed sapien gravida rutrum a sed massa. Etiam libero magna,
                  viverra a porta a, volutpat vel odio. Mauris condimentum
                  consectetur turpis, eget accumsan elit elementum at. Aliquam
                  erat volutpat. Sed varius odio ac ligula ullamcorper consequat
                  ac at elit. Fusce fringilla lectus vel turpis consequat
                  posuere. Mauris et nunc et sem scelerisque consectetur id ac
                  erat. Mauris at consectetur ex. Sed porta dapibus libero, in
                  fringilla ex blandit in. Praesent ultricies euismod neque, sed
                  malesuada sem dignissim quis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
