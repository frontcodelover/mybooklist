import React from 'react'
import { getBookFromGoogleBookApi } from "../../services/mapper/mapper";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";

export default function DisplayBookFromUser({ book }) {
    const bookInfos = getBookFromGoogleBookApi(book);

    console.log(book)

  return (
      <>
       <div className="">
        {bookInfos.thumbnail ? (
          <>
            <Link href={`/books/details/${bookInfos.id}`}>
 
                <Image
                  src={bookInfos.thumbnail}
                  alt={bookInfos.title}
                  height={224}
                  width={130}
                  className="h-48 w-30 mx-auto hover:scale-105 duration-300 shadow-lg rounded-md"
                />
    
            </Link>
          </>
        ) : (
          <>
            <Link href={`/books/details/${bookInfos.id}`}>
        
                <Image
                  src={genBook}
                  alt={bookInfos.title}
                  height={224}
                  width={130}
                  objectFit="cover"
                  className="h-48 w-30 mx-auto hover:scale-105 duration-300 shadow-lg rounded-md"
                />
        
            </Link>
          </>
        )}
      </div>
      </>
  )
}
