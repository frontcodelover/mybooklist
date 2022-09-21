import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function GetSubCollection() {
  const { user } = useAuth();
  const db = getFirestore();
  const [data, setData] = useState([]);

  useEffect(() => {
    const GetSubCollection = async () => {
      const docRef = collection(db, "users", user.uid, "test");
      const q = query(docRef);
      const querySnapshot = await getDocs(q);

      const coucou = querySnapshot.docs.map((doc) => doc.data());

      setData(coucou);
    };
    GetSubCollection();
  }, [db, user]);

  const postId = "25";

  const handleAddDataToTest = async (e) => {
    e.preventDefault();
    const docRef = setDoc(doc(db, "users", user.uid, "test", postId), {
      name: "test",
      age: 55,
    });
  };

  const handleDeleteDataToTest = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.uid, "test", postId);
    await deleteDoc(docRef);
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    const docRef = setDoc(doc(db, "users", user.uid, "prout", postId), {
      name: "test",
      age: 55,
    });
  };

  return (
    <div>
      <button onClick={handleAddDataToTest}>Add data to test</button>
      <button onClick={handleDeleteDataToTest}>Delete data to test</button>
      <button onClick={handleAddSubCategory}>Add sub category</button>
    </div>
  );
}
