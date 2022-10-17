/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useRouter, Router } from "next/router";
import GetSingleBook from "../../../components/Books/SingleBook/GetSingleBook";
import { BOOKS_BY_ID } from "../../../services/api/googleBooks";

export default function details({ data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="mt-4">
      <div className="mx-auto">
        {!data.id ? router.push("/404") : <GetSingleBook data={data} id={id} />}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { id } = params;
  const result = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );

  const data = await result.json();

  console.log(data)

  return {
    props: { data },
  };
};
