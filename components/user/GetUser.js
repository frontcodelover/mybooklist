/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import Image from 'next/image';
import bookPortrait from '../../public/book-portrait.jpg';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import ImageStorage from './ImageStorage';

export default function GetUser() {
  const { user } = useAuth();
  const db = getFirestore();
  const router = useRouter();
  const uuid = nanoid();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await setDoc(doc(db, 'publiclist', uuid), {
      name: 'ma liste de lecture',
      description: 'ma liste de lecture',
      userid: user?.uid,
      pseudo: inputs.pseudo,
      private: false,
      slug: `ma-liste-de-lecture-${user?.uid}`,
      date: new Date(),
      id: uuid,
    });

    await setDoc(doc(db, 'booksreaded', uuid), {
      name: 'mes livres lus',
      description: 'mes livres lus',
      userid: user?.uid,
      pseudo: inputs.pseudo,
      private: false,
      slug: `mes-livres-lus-${user?.uid}`,
      date: new Date(),
      id: uuid,
    });

    await setDoc(doc(db, 'users', user?.uid), {
      pseudo: inputs.pseudo,
      prenom: inputs.prenom,
      age: inputs.age,
      ville: inputs.ville,
      genre: inputs.genre || 'Non renseigné',
      litterature: inputs.litterature,
      phrase: inputs.phrase,
      uid: user?.uid,
    });
    router.push('/user/dashboard');
  };

  var today = new Date();

  console.log(inputs);

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex justify-center px-6 my-12'>
          <div className='w-full xl:w-4/4 lg:w-11/12 flex'>
            <div className='w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'>
              <Image src={bookPortrait} className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg' alt='book-portrait' />
            </div>
            <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
              <div className='px-8 mb-4 text-center'>
                <h3 className='pt-4 mb-2 text-2xl font-semibold'>Et si on fait connaissance ?</h3>
                <p className='mb-4 text-sm text-gray-700'>Remplissez les informations de votre profil</p>
              </div>
              <div className='px-8 pt-6 mx-auto text-center'>
                <ImageStorage uid={user?.uid} />
              </div>
              <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded' onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label className='block mb-2 text-sm font-bold text-gray-700'>Prénom</label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='prenom'
                    type='text'
                    placeholder='Entrez votre prénom'
                    name='prenom'
                    onChange={handleChange}
                    value={inputs.prenom || ''}
                    required
                  />

                  <label className='block mb-2 text-sm font-bold text-gray-700 mt-2'>Pseudo</label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='pseudo'
                    type='text'
                    placeholder='Entrez votre pseudo'
                    name='pseudo'
                    onChange={handleChange}
                    value={inputs.pseudo || ''}
                    required
                  />
                  <label className='block mb-2 text-sm font-bold text-gray-700 mt-2'>Votre date de naissance</label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='age'
                    type='date'
                    max={new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0]}
                    name='age'
                    onKeyDown={(evt) => evt.preventDefault()}
                    onChange={handleChange}
                    value={inputs.age || ''}
                    required
                  />

                  <label className='block mb-2 text-sm font-bold text-gray-700 mt-2'>Votre ville</label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='ville'
                    type='text'
                    placeholder='Entrez votre nom'
                    name='ville'
                    onChange={handleChange}
                    value={inputs.ville || ''}
                    required
                  />
                  <label className='block mb-2 text-sm font-bold text-gray-700 mt-2'>Vous êtes ?</label>
                  <select
                    name='genre'
                    value={inputs.genre || ''}
                    onChange={handleChange}
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    required
                  >
                    <option value='Femme'>une femme</option>
                    <option value='Homme'>un homme</option>
                    <option value='Non binaire'>non binaire</option>
                  </select>
                  <label className='block mb-2 text-sm font-bold text-gray-700 mt-2'>Quel genre de livres aimez-vous lire ?</label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='litterature'
                    type='text'
                    placeholder='Ajoutez un style de lecture'
                    name='litterature'
                    onChange={handleChange}
                    value={inputs.litterature || ''}
                    required
                  />
                  <label className='block mb-2 text-sm font-bold text-gray-700 mt-2'>Votre devise, un proverbe ou une phrase ?</label>
                  <textarea
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='phrase'
                    type='text'
                    placeholder='Ajoutez un style de lecture'
                    name='phrase'
                    onChange={handleChange}
                    value={inputs.phrase || ''}
                    required
                  />
                </div>
                <div className='mb-6 text-center'>
                  <button className='w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none focus:shadow-outline' type='submit'>
                    C'est parti !
                  </button>
                </div>
                <hr className='mb-6 border-t' />
                <div className='text-center text-sm'>
                  Nous gardons vos données personnelles, elles ne sont pas revendus ni cédées à des tiers.
                  <br />
                  Votre pseudo, la ville, le genre littéraire, la devise et l'age sont utilisés sur votre espace public vous pourrez les modifier plus tard.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
