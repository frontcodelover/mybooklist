//! Need to fix array values (double)

import React, {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import { hydrateBooks } from "../../services/mapper/mapper";
import Link from "next/link";
import Image from "next/image";
import genBook from "../../public/livre-generique.jpg";
import { useQuery } from "@tanstack/react-query";

export default function BookSelection({ BooksSelectedDatas }) {
  const [books, setBooks] = useState([]);

  

  useEffect(() => {
    BooksSelectedDatas.map((book) => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${book}`)
        .then((res) => {
          setBooks((book) => [...book, res.data]);
        });
    });
  }, [BooksSelectedDatas]);



  console.log(books);


  return (
    <>
      
    </>
  );
}
