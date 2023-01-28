import React from 'react';
import Image from 'next/image';
import genBook from '../../../public/livre-generique.jpg';
import { getBookFromGoogleBookApi } from '../../../services/mapper/mapper';
import GetBooksRelatedByAuthors from './GetBooksRelatedByAuthors';
import GetBooksByMainCategory from './GetBooksByMainCategory';
import { useAuth } from '../../../context/AuthContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Head from 'next/head';
import parse from 'html-react-parser';
import BookmarkBooksList from './BookToList/BookmarkBooksList';
import Modal from '../../Layout/modal';
import DisplayReview from './Reviews/DisplayReview';
import AddReview from './Reviews/AddReview';
import Link from 'next/link';

export default function GetSingleBook({ data, id }) {
  const { user } = useAuth();

  // Mapper
  const bookInfos = getBookFromGoogleBookApi(data);

  console.log('CAT', bookInfos?.categories);

  return (
    <>
      <Head>
        <title>
          {bookInfos?.title} Livre de {bookInfos?.authors} - ListeDeLecture
        </title>
        <meta name='description' content='Mybooklist vous permet de garder une trace de vos lectures' />
      </Head>

      <div className='mx-auto bg-[#2b3055] flex py-20 my-5 border-b-4 border-[#7c61a3]/50'>
        <div className='container lg:max-w-screen-xl mx-auto flex px-2'>
          {bookInfos?.thumbnail ? (
            <Image src={bookInfos?.thumbnail} alt={bookInfos?.title} width={200} height={200} className='w-auto object-cover h-60 shadow-lg rounded-md ml-4' />
          ) : (
            <div className=''>
              <Image src={genBook} alt={bookInfos?.title} className='h-48 w-auto md:h-64 md:w-48 object-cover shadow-lg pl-4' />
            </div>
          )}

          <div className='mx-12'>
            <h1 className='text-2xl md:text-5xl font-bold mb-2 text-white tracking-tight'>{bookInfos?.title}</h1>
            {bookInfos?.subtitle && <h2 className='text-xl text-white/90 mb-3'>{bookInfos?.subtitle}</h2>}
            <div className='md:text-2xl text-md text-white/80 tracking-tight'>
              {bookInfos?.authors &&
                bookInfos?.authors.map((author) => (
                  <>
                    <div key={author}>Un livre de {author}</div>
                  </>
                ))}
            </div>
            <p className='text-white/50 font-light'>Edition : {bookInfos?.publisher}</p>
            <p className='text-white/50 font-light'>Année de publication :{bookInfos?.publishedDate ? ' ' + bookInfos?.publishedDate.substring(0, 4) : ' inconnue'}</p>
            {bookInfos?.isbn13 && (
              <div className='flex hover:bg-purple-600 p-4 mt-6 w-fit rounded-xl bg-purple-500 shadow-md'>
                <a target='_blank' rel='noreferrer' href={`https://www.amazon.fr/s?k=${bookInfos?.isbn13}&tag=avantjetaisriche-21`}>
                  <p className='text-sm font-semibold text-white flex'>
                    <span className='mt-1 pr-1'>
                      <AiOutlineShoppingCart />
                    </span>
                    Acheter ce livre
                  </p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='my-9 flex flex-col sm:flex-row lg:max-w-screen-xl mx-auto'>
        <div className='sm:flex-none sm:w-56'>
          <div className='border-r border-main-color/20'>
            <div className='flex flex-col w-fit p-4'>
              {user ? (
                <>
                  <div className='pb-5'>
                    <BookmarkBooksList bookid={id} userid={user?.uid} />
                  </div>
                  {/* <div>
                    <AlreadyRead bookid={id} userid={user?.uid} />
                  </div> */}
                </>
              ) : (
                <Modal />
              )}
            </div>

            {bookInfos?.isbn13 && (
              <div className='flex hover:bg-purple-600 p-4 w-fit rounded-xl bg-purple-500 shadow-md ml-6'>
                <a target='_blank' rel='noreferrer' href={`https://www.amazon.fr/s?k=${bookInfos?.isbn13}&tag=avantjetaisriche-21`}>
                  <p className='text-sm font-semibold text-white flex'>
                    <span className='mt-1 pr-1'>
                      <AiOutlineShoppingCart />
                    </span>
                    Acheter ce livre
                  </p>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className='sm:grow h-auto  p-5'>
          {bookInfos.description && (
            <div className='mb-9'>
              <h3 className='text-2xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color tracking-tight'>Résumé du livre</h3>
              <div className='text-justify text-md tracking-tight'>{parse(bookInfos.description)}</div>
              <div className=''>
                {bookInfos.categories && (
                  <div className='flex flex-col'>
                    {bookInfos.categories.map((b) => (
                      <div key={b} className='bg-purple-100 inline-block px-3 py-1 gap-3 align-middle justify-center'>
                        {b}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div>{bookInfos?.categories && <GetBooksByMainCategory booktitle={bookInfos?.title} bookcat={bookInfos?.categories} bookid={id} />}</div>
          <div className='my-9'>
            {bookInfos?.authors ? (
              bookInfos?.authors?.map((author) => (
                <>
                  <GetBooksRelatedByAuthors author={author} bookid={id} />
                </>
              ))
            ) : (
              <p>Auteur inconnu</p>
            )}
            <div className='mt-4'>
              <DisplayReview bookid={id} />
              {user && (
                <>
                  <h3 className='text-2xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color tracking-tight'>Ajoutez votre critique</h3>
                  <AddReview bookid={id} user={user.uid} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
