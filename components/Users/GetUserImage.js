import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import avatar from '../../public/avatar.png';
import Image from 'next/image';

export default function GetUserImage({ user }) {
  const [imageUrls, setImageUrls] = useState('');

  useEffect(() => {
    const storageRef = ref(storage, user + '.jpg');
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrls(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <>
      {imageUrls ? (
        <Image src={imageUrls} alt='user' className='rounded-full object-contain' width={40} height={0} />
      ) : (
        <div className='w-16'>
          <Image src={avatar} alt='avatar' width={120} height={120} />
        </div>
      )}
    </>
  );
}
