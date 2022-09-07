import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Router, {useRouter} from 'next/router'
import BookLayout from './BookLayout'

export default function BookByAuthors() {
  const [books, setBooks] = useState([])
  const router = useRouter()
  const [startIndex, setStartIndex] = useState(0);

  const author = router.query.id
  const lower = author.toLowerCase()
    const authorFormat = lower.replace(/ /g, "+")
  console.log(authorFormat)

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${authorFormat}"&maxResults=39&startIndex=${startIndex}&langRestrict=fr&printType=books`)
            .then((res) => {
              setBooks(res.data.items)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [authorFormat, startIndex])
  
    function nextIndex(e) {
      e.preventDefault();
      setStartIndex(startIndex + 40);
      window.scrollTo(0, 0);
    }
  
    function previousIndex(e) {
      e.preventDefault();
      setStartIndex(startIndex - 40);
    }


  return (
    <div>
      <h1 className="text-3xl font-semibold">Livres de {author}</h1>
      <div className="grid grid-cols-1 gap-1 lg:max-w-screen-md mx-auto w-full">
      {books?.map((book) => (
          <div key={book.id}>
            {/* <Bookmarks bookid={book.id} userid={user.uid} /> */}
            <BookLayout book={book}  />
          </div>
        ))}
        </div>
        <div className="flex justify-center">
        <button
          onClick={previousIndex}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Précédent
        </button>
        <button
          onClick={nextIndex}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Suivant
        </button>
      </div>

    </div>
    
    
  )
}
