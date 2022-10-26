import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import genBook from "../../../public/livre-generique.jpg";
import { getBookFromGoogleBookApi } from "../../../services/mapper/mapper";
import GetBooksRelatedByAuthors from "./GetBooksRelatedByAuthors";
import GetBooksByMainCategory from "./GetBooksByMainCategory";
import { useAuth } from "../../../context/AuthContext";
import AlreadyRead from "./BookToList/AlreadyRead";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../../feature/book/bookSlice";
import parse from "html-react-parser";
import BookmarkBooksList from "./BookToList/BookmarkBooksList";
import Modal from "../../Layout/modal";
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
              <Image
                src={genBook}
                alt={bookInfos?.title}
                className="h-48 w-auto md:h-64 md:w-48 object-cover shadow-lg pl-4"
              />
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
            <p className="text-white/50 font-light">
              Edition : {bookInfos?.publisher}
            </p>
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
                  <p
                    className="text-sm font-semibold text-red-500 flex"
                  >
                    <div className="mt-1 pr-1">
                      <AiOutlineShoppingCart />
                    </div>
                    Acheter ce livre sur Amazon
                  </p>
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
              <div className="text-justify text-lg tracking-tight">
                {parse(bookInfos.description)}
              </div>
            </div>
          )}
          <div>
            {bookInfos?.categories && (
              <GetBooksByMainCategory
                booktitle={bookInfos?.title}
                bookid={id}
              />
            )}
          </div>
          <div className="my-9">
            {bookInfos?.authors ? (
              bookInfos?.authors?.map((author) => (
                <>
                  <GetBooksRelatedByAuthors author={author} bookid={id} />
                </>
              ))
            ) : (
              <p>Auteur inconnu</p>
            )}
            <div className="mt-4">
              <h3 className="text-3xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color tracking-tight">
                Les dernières critiques
              </h3>
              <DisplayReview bookid={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
