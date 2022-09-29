import React from "react";
import GetUser from "../../components/User/GetUser";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";



export default function Firststep() {

  return (
    <>

      <GetUser />

    </>
  );
}
