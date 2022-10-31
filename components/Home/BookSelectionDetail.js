import React, { useEffect, useState } from "react";
import axios from "axios";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";
import { getBookFromGoogleBookApi } from "../../services/mapper/mapper";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import parse from "html-react-parser";

export default function BookSelectionDetail({ bookid }) {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BOOKS_BY_ID}${bookid}`).then((res) => {
      setBookData(res.data);
      setIsLoading(false);
    });
  }, [bookid]);

  const bookInfos = getBookFromGoogleBookApi(bookData);


  return (
    <>

        <div
          key={bookInfos.id}
          className="grid lg:grid-rows-1 lg:grid-flow-col bg-white shadow-lg hover:shadow-xl transition duration-300 border-b-2 border-t border-r-2 border-l-2 border-l-slate-100 border-r-slate-100 border-t-slate-100 border-slate-200/90 p-10 rounded-xl place-items-center"
        >
          {bookInfos.thumbnail ? (
            <>
              <div className="lg:row-span-1">
                <Link href={`/books/details/${bookInfos.id}`}>
                
                    <p className="lg:text-4xl text-2xl font-bold pb-2 text-rose-500 tracking-tight">{bookInfos.title}</p>
                  
                </Link>
                <div key={bookInfos.authors} className="pb-2 font-bold tracking-tight">Un livre de {bookInfos.authors}</div>
                <p className="text-left pb-5 tracking-tight">Année de publication :
              {bookInfos?.publishedDate
                ? " " + bookInfos?.publishedDate.substring(0, 4)
                : " inconnue"}</p>
                <p className="text- text-left font-light ">{parse(bookInfos.description.substring(0, 690))}...</p>
              </div>
              <div className="col-span-2">
              <Link href={`/books/details/${bookInfos.id}`}>
              
                  <Image
                    src={bookInfos.thumbnail}
                    alt={bookInfos.title}
                    height={200}
                    width={150}
                    className="h-64 w-auto object-cover ml-4 hidden lg:block shadow-lg rounded-md"
                  />
                
              </Link>
              </div>
            </>
          ) : (
            <>
              <Link href={`/books/details/${bookInfos.id}`}>
                <p className="hover:scale-125">
                  <Image
                    src={genBook}
                    alt={bookInfos.title}
                    height={200}
                    width={150}
                  />
                </p>
              </Link>
              <Link href={`/books/details/${bookInfos.id}`}>
                <p className="text-xs font-bold">{bookInfos.title}</p>
              </Link>
            </>
          )}
        </div>
    </>
  );
}
