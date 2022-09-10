import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import avatar from "../../public/avatar.png";

import Image from "next/image";

export default function GetUserImage({ user, size }) {
  const [imageUrls, setImageUrls] = useState("");

  const newSize = 16;
  console.log("USER", user);

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
        <img
          src={imageUrls}
          width={size}
          height={size}
          className="rounded-full"
          alt="avatar"
        />
      ) : (
        <div className="w-16">
          <Image src={avatar} alt="avatar" width={size} height={size} />
        </div>
      )}
    </>
  );
}
