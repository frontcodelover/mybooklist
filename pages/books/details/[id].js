/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useRouter } from "next/router";
import GetSingleBook from "../../../components/Books/GetSingleBook";
import { BOOKS_BY_ID } from "../../../services/api/googleBooks";

export default function details({ data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    
    <div className="container max-w-screen-xl mx-auto mt-4">
      {/* <GetSingleBook id='11' /> */}
      <GetSingleBook data={data} id={id} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: "blocking", // true or false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  if (!id) {
    return {
      notFound: true,
    };
  }
  const response = await fetch(`${BOOKS_BY_ID}${params.id}`);
  const data = await new Promise((resolve) =>
    setTimeout(() => {
      resolve(response.json());
    }, 0)
  );
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
