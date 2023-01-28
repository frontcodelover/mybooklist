/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function HeroBan() {
  const { user } = useAuth();
  return (
    <section className='relative bg-hero-bg bg-center bg-no-repeat bg-cover z-1'>
      <div className='absolute  bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25'></div>

      <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8'>
        <div className='max-w-xl text-center sm:text-left'>
          <h1 className='text-4xl font-extrabold sm:text-5xl text-white'>
            Lisez plus,
            <strong className='block font-extrabold text-white'>apprenez plus !</strong>
          </h1>

          <p className='mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-white/80'>Constituez-vous une liste à votre image en ajoutant tous les livres que vous souhaitez lire !</p>

          <div className='mt-8 flex flex-wrap gap-4 text-center'>
            {!user ? (
              <Link href='/user/signup'>
                <p className='block w-full rounded bg-[#1B1F3B] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#2A2F5D] focus:outline-none focus:ring active:bg-purple-500 sm:w-auto'>
                  S'incrire gratuitement
                </p>
              </Link>
            ) : (
              <Link href='/user/dashboard'>
                <p
                  href='#'
                  className='block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#1B1F3B] shadow hover:text-[#2A2F5D] focus:outline-none focus:ring active:text-rose-500 sm:w-auto'
                >
                  Mon profil
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
