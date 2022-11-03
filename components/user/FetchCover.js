import React, { useState, useEffect } from "react";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";
import axios from "axios";
import DisplayBookFromUser from "./DisplayBookFromUser";

export default function FetchCover({ bookid }) {
  console.log("COVER", bookid);
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookid.map((r) => {
      axios.get(`${BOOKS_BY_ID}${r}`).then((res) => {
        setBookData((prev) => [...prev, res.data]);
        setIsLoading(false);
      });
    });
  }, [bookid]);

  return (
    <>
      {!isLoading && (
        <div className="grid gap-4 grid-cols-6">
          {bookData.map((r, index) =>
          index < 6 && (
            <div key={r.id}>
                <DisplayBookFromUser book={r} />
                
            </div>
          ))}
        </div>
      )}
    </>
  );
}
