/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SectionCta() {
  const { user } = useAuth();

  return (
    <div className='bg-purple-100'>
      <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl '>
          <span className='block text-main-color '>Accéder à des millions de livres</span>
          <span className='block text-purple-500'>Commencez votre bibliothèque virtuelle aujourd'hui.</span>
        </h2>
        {user ? (
          <>
            <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
              <div className='inline-flex rounded-md shadow'>
                <Link href='user/profil'>
                  <p className='inline-flex items-center justify-center rounded-md border border-transparent bg-purple-500 px-5 py-3 text-base font-medium text-white hover:bg-purple-700'>
                    Mon espace personnel
                  </p>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
            <div className='inline-flex rounded-md shadow'>
              <Link href='user/signup'>
                <p className='inline-flex items-center justify-center rounded-md border border-transparent bg-purple-500 px-5 py-3 text-base font-medium text-white hover:bg-purple-700'>S'inscrire</p>
              </Link>
            </div>
            <div className='ml-3 inline-flex rounded-md shadow'>
              <Link href='user/login'>
                <p className='inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-purple-500 hover:bg-indigo-50'>Se connecter</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
