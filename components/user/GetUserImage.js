import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import avatar from "../../public/avatar.png";

import Image from "next/image";

export default function GetUserImage({ user, size }) {
  const [imageUrls, setImageUrls] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, user + ".jpg");
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
        <Image
          src={imageUrls}
          alt="user"
          className="rounded-full"
          objectFit="cover"
          width={size}
          height={size}
        />
      ) : (
        <div className="w-16">
          <Image src={avatar} alt="avatar" width={size} height={size} />
        </div>
      )}
    </>
  );
}
