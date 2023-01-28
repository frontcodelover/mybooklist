import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { IoBookSharp } from 'react-icons/io5';
import DisplayCover from './DisplayCover';

export default function DisplayLists({ userid }) {
  const db = getFirestore();

  const bookListQuery = useQuery(
    ['bookList', userid],
    () => {
      const q = query(collection(db, 'publiclist'), where('userid', '==', userid));
      return getDocs(q);
    },
    {},
  );
  const resultbookListQuery = (bookListQuery.data?.docs || []).map((doc) => doc.data()) || [];
  const isLoadingQuery = bookListQuery.isLoading;

  let tab = [];

  //fonction qui créé un tableau qui sera parser ensuite pour afficher les coovertures des livres dans la liste sur le dashboard
  function getBookInfo() {
    if (!isLoadingQuery) {
      resultbookListQuery.map((r) => r?.bookid?.length > 0 && tab.push({ id: r.id, bookid: r.bookid }));
    }
  }
  getBookInfo();

  console.log('TAB', tab);

  return (
    <>
      {isLoadingQuery ? (
        <div>Loading...</div>
      ) : (
        <div className=''>
          <h2 className='text-3xl font-bold mb-10 border-b pb-2 border-main-color/20 text-main-color tracking-tight'>Mes listes de lecture</h2>
          {resultbookListQuery.length ? (
            resultbookListQuery?.map((docData) => {
              return (
                <div
                  key={docData.id}
                  className='p-10 border-b-2 border-t border-r-2 border-l-2 relative border-l-slate-100 border-r-slate-100 border-t-slate-100 border-slate-200/90 my-10 shadow-xl rounded-xl'
                >
                  <div className='flex flex-row gap-2'>
                    <Link href={`/list/${docData?.slug}`}>
                      <h2 className='text-3xl font-bold tracking-tight my-2 text-purple-800 flex' style={{ color: docData?.color }}>
                        <span className='mt-2 mr-2'>
                          <IoBookSharp />
                        </span>
                        {docData.name}
                      </h2>
                    </Link>
                    <div className='flex flex-row gap-2 mt-3 text-purple-800'>
                      <p className='font-bold'>{docData?.bookid?.length != undefined ? '(' + docData?.bookid?.length + ')' : '(0)'}</p>
                    </div>
                    <p>
                      {!docData.private ? (
                        <div className='pb-3 pt-2 px-3 md:px-5 mt-2 font-bold text-sm text-white border bg-purple-800 block tracking-tight right-0 absolute shadow-sm'>publique</div>
                      ) : (
                        <div className='pb-3 pt-2 px-3 md:px-5 mt-2 font-bold text-sm text-white border bg-red-800 block tracking-tight right-0 absolute shadow-sm'>privée</div>
                      )}
                    </p>
                  </div>
                  <p className='text-md mb-8 mt-4'>{docData?.description}</p>
                  <DisplayCover tab={tab} listId={docData.id} />
                  {docData?.bookid?.length ? (
                    <div className='flex hover:bg-purple-600 py-2 px-4  w-fit rounded-xl bg-purple-500 shadow-md mt-6 text-white font-semibold'>
                      <Link href={`/list/${docData?.slug}`}>Voir la liste complète</Link>
                    </div>
                  ) : (
                    <div className='flex hover:bg-purple-600 py-2 px-4  w-fit rounded-xl bg-purple-500 shadow-md mt-6 text-white font-semibold'>
                      <Link href='/books'>Ajouter des livres dans votre liste</Link>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>Aucune liste de lecture</p>
          )}
        </div>
      )}
    </>
  );
}
