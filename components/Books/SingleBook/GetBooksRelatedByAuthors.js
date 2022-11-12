import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { hydrateBooks } from '../../../services/mapper/mapper'
import genBook from '../../../public/livre-generique.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { BOOKS_SEARCH } from '../../../services/api/googleBooks'

export default function GetBooksRelatedByAuthors({ author, bookid }) {
	const [books, setBooks] = useState([])

	useEffect(() => {
		axios
			.get(
				`${BOOKS_SEARCH}inauthor:"${author}"&maxResults=12&langRestrict=fr&printType=books`,
			)
			.then((res) => {
				setBooks(res.data.items)
			})
	}, [author])

	let booksInfos
	if (books !== undefined) {
		booksInfos = hydrateBooks(books)
	}

	const withoutIMG = booksInfos?.filter((book) => {
		return book.thumbnail !== undefined
	})

	const excludeCurrentId = withoutIMG?.filter((book) => {
		return book.id !== bookid
	})

	return (
		<>
			{booksInfos && booksInfos.length > 0 ? (
				<>
					<h3 className="text-2xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color tracking-tight">
						Les autres ouvrages de {author}
					</h3>
					<div className="grid grid-cols-3 lg:grid-cols-6 gap-5">
						{excludeCurrentId.map((book) => (
							<div className="flex-cols w-36" key={book.id + '_33'}>
								{book.thumbnail ? (
									<>
										<Link href={`/books/details/${book.id}`}>
											<Image
												src={book.thumbnail}
												alt={book.title}
												height={224}
												width={130}
												className="mx-auto mb-5 h-48 shadow-lg rounded-md"
											/>
										</Link>
									</>
								) : (
									<div className="mx-auto mb-5 h-48 " key={book.id + '3'}>
										<Link href={`/books/details/${book.id}`}>
											<Image src={genBook} alt={book.title} className="h-48 " />
										</Link>
									</div>
								)}

								<h1 className="text-sm font-semibold">
									<Link href={`/books/details/${book.id}`}>
										{book?.title?.length > 30
											? book.title.substring(0, 30) + '...'
											: book.title}
									</Link>
								</h1>
							</div>
						))}
					</div>
				</>
			) : (
				<></>
			)}
		</>
	)
}
