import React from 'react';
import library from '../../public/library.jpg';
import Image from 'next/image';

export default function DashboardBanner() {
  return (
    <div className='w-screen max-h-screen object-cover'>
      <Image style={{ objectFit: 'cover', height: '400px', width: '100%' }} src={library} alt='banniere-profil' height='400' />
    </div>
  );
}
