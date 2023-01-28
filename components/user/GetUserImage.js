import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import avatar from '../../public/avatar.png';

import Image from 'next/image';

export default function GetUserImage({ user, size }) {
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
        <Image style={{ objectFit: 'cover', height: size }} src={imageUrls} alt='user' className='rounded-full' width={size} height={size} layout='fill' />
      ) : (
        <div className='w-16'>
          <Image src={avatar} alt='avatar' width={size} height={size} />
        </div>
      )}
    </>
  );
}
