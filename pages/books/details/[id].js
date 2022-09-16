/* eslint-disable react-hooks/rules-of-hooks */
//https://stackoverflow.com/questions/64427389/nextjs-dynamic-routes-with-static-pages-gives-paths-must-be-an-array-of-string
import React, { useState } from "react";
import { useRouter } from "next/router";
import GetSingleBook from "../../../components/Books/GetSingleBook";
import { BOOKS_BY_ID } from "../../../services/api/googleBooks";

export default function details({ singleBook }) {
  const router = useRouter();
  const { id } = router.query;

  const pid = id.toString();


  getStaticPaths(pid);

  
  
  return (
    <div className="container max-w-screen-xl mx-auto mt-4">
      {/* <GetSingleBook id='11' /> */}
      <GetSingleBook props={singleBook} coucou="coucou" id="11" />
    </div>
  );
}

export async function getStaticPaths(pid) {
  // Get the paths we want to pre-render based on posts
  return { 
  paths : [
    { params: { id: pid } }
  ],
  fallback: false
}


  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.

}

export async function getStaticProps({ params }) {
  const res = await fetch(`${BOOKS_BY_ID}${params.id}`);
  const singleBook = await res.json();
  console.log("SINSIE", singleBook);
  return {
    props: {
      singleBook,
    },
  };
}