import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import avatar from "../../../public/avatar.png";
import Image from "next/image";

export default function GetImage({ userid }) {
  const [imageUrls, setImageUrls] = useState("");

  const storageRef = ref(storage, userid + ".jpg");

  useEffect(() => {
    const storageRef = ref(storage, userid + ".jpg");
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrls(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userid]);

  console.log(imageUrls);

  return (
    <>
      {imageUrls ? (
        <Image
          src={imageUrls}
          alt="user"
          objectFit="cover"
          width={50}
          height={50}
          className="rounded-full"
        />
      ) : (
        <div className="w-16">
          <Image src={avatar} alt="avatar" width={50} height={50} />
        </div>
      )}
    </>
  );
}