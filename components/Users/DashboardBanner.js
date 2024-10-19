import React from 'react';
import library from '../../public/library.jpg';
import Image from 'next/image';

export default function DashboardBanner() {
  return (
    <div className='w-screen max-h-screen object-cover'>
			<Image className='w-screen h-72 object-cover' src={library} alt='banniere-profil' height={1000} width={1000} />
    </div>
  );
}
