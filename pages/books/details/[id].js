/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter, Router } from "next/router";
import GetSingleBook from "../../../components/Books/SingleBook/GetSingleBook";

export default function details({ data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="mt-0">
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

  console.log(JSON.stringify(data))

  return {
    props: { data },
  };
};