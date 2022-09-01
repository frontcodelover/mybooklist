import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchBookBookmarked({ bookInfos }) {
  const [bookDetail, setBookDetail] = useState([]);

  useEffect(() => {
    let allBook = [];

    bookInfos.map(async (book) => {
      await axios
        .get(`https://www.googleapis.com/books/v1/volumes/${book.bookid}`)
        .then((res) => {
          allBook.push(res.data);
          setBookDetail(allBook);
        });
    });
    fetch();
  }, [bookInfos]);

  function fetch() {
    try {
      return (
        <>
          <div>FetchBookBookmarked</div>
          <div className="grid grid-cols-1 gap-4">
            {bookDetail.map((book) => {
              return (
                <div key={book.id}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                  <h2 className="text-2xl">{book.volumeInfo.title}</h2>
                  <h3 className="text-xl">{book.volumeInfo.subtitle}</h3>
                  Auteur(s) :{" "}
                  {book.volumeInfo.authors ? (
                    book.volumeInfo.authors.map((author) => (
                      <p key={author}>{author}</p>
                    ))
                  ) : (
                    <p>Auteur inconnu</p>
                  )}
                  {book.volumeInfo.categories ? (
                    book.volumeInfo.categories.map((category) => (
                      <p key={category}>{category}</p>
                    ))
                  ) : (
                    <p>Catégorie inconnue</p>
                  )}
                  <p>{book.volumeInfo.pageCount} pages</p>
                </div>
              );
            })}
          </div>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  }
  return fetch();
}

//      console.log(bookDetail.map((book) => book.volumeInfo.title));

//     return (
//         <>
//             {

//                     bookDetail.map((book) => book.volumeInfo.title)

//             }
//         </>
//       );
// }
