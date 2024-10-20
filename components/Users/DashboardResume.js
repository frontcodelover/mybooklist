/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import GetUserImage from "./GetUserImage";
import DashboardBanner from "./DashboardBanner";

import CreateListOfBooks from "./CreateListOfBooks";
import DisplayLists from "./DisplayLists";

export default function DashboardResume() {
  const { user } = useAuth();
  const db = getFirestore();
  const [currentUser, setUser] = useState({});

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const usersCollection = collection(db, "users");
        const queriedCurrentUser = query(
          usersCollection,
          where("uid", "==", user?.uid)
        );

        const queriedCurrentUserResult = await getDocs(queriedCurrentUser);

        queriedCurrentUserResult.forEach((doc) => {
          setUser(doc.data());
        });
      };

      getUser();
    }
  }, [user && user.uid]);

  const today = new Date();
  const birthDate = new Date(currentUser.age);
  const age = today.getFullYear() - birthDate.getFullYear();

  return (
    <div className="relative">
      <div className="container mx-auto lg:max-w-screen-xl p-4">
        {currentUser.pseudo ? (
          <>
            <div className="shadow rounded-xl">
              <div className="flex col-span-0 left-1/5 relative">
                <DashboardBanner />
                <div className="flex flex-col p-3 bg-white shadow-md rounded-full absolute bottom-0 -mb-16 mx-2">
                  <GetUserImage user={currentUser.uid} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-col mt-10">
                  <h1 className="text-4xl md:text-5xl font-bold my-3 text-main-color tracking-tight">
                    {currentUser.pseudo}
                  </h1>
                  <p>
                    De {currentUser.ville} | {currentUser.genre} | {age} ans
                  </p>
                </div>
                <p className="py-6">
                  J'aime lire des livres qui traitent de :{" "}
                  {currentUser.litterature}
                </p>
                <h2 className="text-xl font-semibold">
                  Ma devise, mon proverbe préféré :
                </h2>
                <p>{currentUser.phrase}</p>
              </div>
            </div>
            <div className="flex flex-col  my-10">
              <DisplayLists userid={user?.uid} />
              <CreateListOfBooks
                userid={user?.uid}
                pseudo={currentUser.pseudo}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl">
              {" "}
              Oups on dirait bien que vous avez oubliez de remplir vos
              informations
            </h1>
            <div className="">
              <Link href="/user/firststep">
                <button className="mt-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                  Remplir mon profil
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
