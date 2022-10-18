import React, { useState, useEffect } from "react";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";
import axios from "axios";
import { getBookFromGoogleBookApi } from "../../services/mapper/mapper";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";

export default function FetchCover({ bookid }) {
  console.log(bookid);
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookid.map((r) => {
      axios.get(`${BOOKS_BY_ID}${r}`).then((res) => {
        setBookData(res.data);
        setIsLoading(false);
      });
    });
  }, [bookid]);

  const bookInfos = getBookFromGoogleBookApi(bookData);

  return (
    <>
      <div className="grid lg:grid-cols-9 md:grid-cols-3 grid-cols-2 gap-2">
        {bookInfos.thumbnail ? (
          <>
            <Link href={`/books/details/${bookInfos.id}`}>
              <a>
                <Image
                  src={bookInfos.thumbnail}
                  alt={bookInfos.title}
                  height={224}
                  width={152}
                  className="h-48 w-30 mx-auto hover:scale-105 duration-300"
                />
              </a>
            </Link>
          </>
        ) : (
          <>
            <Link href={`/books/details/${bookInfos.id}`}>
              <a className="">
                <Image
                  src={genBook}
                  alt={bookInfos.title}
                  height={224}
                  width={152}
                  objectFit="cover"
                  className="hover:scale-105 duration-300"
                />
              </a>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
