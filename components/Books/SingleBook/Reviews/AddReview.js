import { useState } from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

/* eslint-disable react/no-unescaped-entities */
export default function AddReview({ user, bookid }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [date, setDate] = useState(null);
  const db = getFirestore();
  console.log(user);
  // const [inputs, setInputs] = useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  const uuidRandom = self.crypto.randomUUID();

  const handleCreateList = async (e) => {
    e.preventDefault();
    const list = doc(db, 'booksreview', uuidRandom);
    await setDoc(list, {
      title,
      note: +note,
      content,
      userid: user,
      bookid,
      readed: date,
      wrote: new Date(),
      id: uuidRandom,
    });
    window.location.reload(false);
  };

  return (
    <>
      <div className='grid md:grid-cols-2'>
        <form className='grid gap-3' onSubmit={handleCreateList}>
          <label htmlFor='note' className='text-gray-700 tracking-tight font-semibold'>
            Quelle note attribuez-vous à ce livre ?
          </label>
          <input
            required
            type='number'
            name='note'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            min={0}
            max={5}
            className='form-input
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          ></input>
          <label htmlFor='readed' className='text-gray-700 tracking-tight font-semibold'>
            Quand avez-vous lu ce livre ?
          </label>
          <input
            required
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().slice(0, -14)}
            name='readed'
            type='date'
            className='form-input 
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />

          <label htmlFor='title' className='text-gray-700 tracking-tight font-semibold'>
            Quel est le titre de votre critique ?
          </label>
          <input
            required
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-input
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          ></input>
          <label htmlFor='content' className='text-gray-700 tracking-tight font-semibold'>
            Qu'avez-vous pensé de cette ouvrage ?
          </label>
          <textarea
            required
            type='textarea'
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-input
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                    min-h-[200px]
                    '
          ></textarea>
          <button className='w-full p-2 my-5 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow font-semibold max-w-fit'>Postez votre critique</button>
        </form>
        <div className='grid-cols-1 gap-5 text-gray-700 md:px-8'>
          {note && (
            <>
              <h2 className='font-semibold text-xl mt-6 mb-10 md:mt-0'>Aperçu de votre critique</h2>
              <div className='font-light'>
                Note attribuée à cet ouvrage : <span class='font-normal'>{note} / 5</span>
              </div>
            </>
          )}
          <p className='font-bold text-lg mb-3'>{title}</p>
          {content && <p>{content}</p>}
        </div>
      </div>
    </>
  );
}
