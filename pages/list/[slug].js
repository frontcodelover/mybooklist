import React from "react";
import { useRouter } from "next/router";
import GetAllBooksFromTheList from "../../components/Lists/GetAllBooksFromTheList";

export default function List() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="container max-w-screen-xl mx-auto mt-4">
      <GetAllBooksFromTheList slug={slug} />
    </div>
  );
}
