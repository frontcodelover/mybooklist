import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import avatar from '../../public/avatar.png';
import Image from 'next/image';
import { Tooltip } from 'flowbite-react';

export default function ImageStorage({ uid }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);

  const imagesListRef = ref(storage, 'images');
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, uid + '.jpg');
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
      });
    });
  };

  return (
    <>
      <div className='flex gap-2'></div>
      <div className='border p-4 rounded shadow bg-gray-50'>
        <div className='flex items-center gap-5 justify-center'>
          <div>
            {imageUrls ? (
              <img src={imageUrls} className='w-16 h-16 object-cover rounded-full' />
            ) : (
              <div className='w-16'>
                <Image src={avatar} alt='avatar' width={40} height={40}/>
              </div>
            )}
          </div>
          <div>
            <Tooltip content='Choisissez une photo de profil et cliquez sur envoyer' style='light'>
              <input
                type='file'
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
                className='border border-gray-300 rounded-md px-2 py-1 hidden'
                id='files'
              />
              <label htmlFor='files' className='border border-gray-300 rounded-md px-2 py-1 font-bold cursor-pointer bg-white shadow'>
                Choisir une photo de profil
              </label>
            </Tooltip>
          </div>

          <button onClick={uploadFile} className='bg-purple-500 hover:bg-purple-700 text-white rounded-md px-2 py-1 shadow'>
            {' '}
            Envoyer
          </button>
        </div>
      </div>
    </>
  );
}
