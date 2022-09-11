import React from "react";
import banGen from "../../public/banGen.jpg";
import Image from "next/image";

export default function DashboardBanner() {
  return (
    <div className="w-screen max-h-screen object-cover">
          <Image src={banGen} objectFit="cover" height="400" />
    </div>
  );
}
