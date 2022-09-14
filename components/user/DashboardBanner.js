import React from "react";
import library from "../../public/library.jpg";
import Image from "next/image";

export default function DashboardBanner() {
  return (
    <div className="w-screen max-h-screen object-cover">
      <Image src={library} alt="banniere-profil" objectFit="cover" height="400" />
    </div>
  );
}
