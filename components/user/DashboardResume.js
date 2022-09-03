import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import GetUserBook from "./GetUserBook";

export default function DashboardResume() {
  const { user } = useAuth();
  const db = getFirestore();
  const [currentUser, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const usersCollection = collection(db, "users");
      const queriedCurrentUser = query(
        usersCollection,
        where("uid", "==", user.uid)
      );
      const queriedCurrentUserResult = await getDocs(queriedCurrentUser);

      queriedCurrentUserResult.forEach((doc) => {
        setUser(doc.data());
      });
    };
    getUser();
  }, [user && user.uid]);

  const today = new Date();
  const birthDate = new Date(currentUser.age);
  const age = today.getFullYear() - birthDate.getFullYear();

  return (
    <>
      <div className="container mx-auto">
        {currentUser.pseudo ? (
          <>
            <h1 className="text-5xl font-semibold mb-3">
              {currentUser.pseudo}
            </h1>
              <p>
                De {currentUser.ville} | {currentUser.genre} | {age} ans
              </p>
            <div>
              <p className="py-6">J'aime lire des livres qui traitent de : {currentUser.litterature}</p>
              <h2 className="text-xl font-semibold">Ma devise, mon proverbe préféré :</h2>
              <p>{currentUser.phrase}</p>
            </div>
            <GetUserBook user={user?.uid} />
          </>
        ) : (
          <>
            <h1 className="text-2xl"> Oups on dirait bien que vous avez oubliez de remplir vos informations</h1>
            <div className="">
                <Link href="/user/firststep">
                  <button className="mt-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">Remplir mon profil</button>
                </Link>
            </div>
          </>
        )}

      </div>
    </>
  );
}
