import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

//* Navigation du site

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="top-0 z-50 bg-white">
      <div className="layout flex h-14 items-center justify-between">
        <div className="lg:container mx-auto">
          <nav className="w-full flex py-6">
            <Link href="/">
              <div className="logo text-2xl font-semibold basis-1/4 flex cursor-pointer">
                <span className="font-semibold">Liste </span>
                <span className="font-bold text-blue-600">deLecture</span>
              </div>
            </Link>
            <ul className="list-none basis-3/4 flex justify-end font-semibold">
              {user ? (
                <>
                  <li className="px-6 text-lg cursor-pointer">
                    <a
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                    >
                      Se déconnecter
                    </a>
                  </li>
                  <li className="px-6 text-lg cursor-pointer">
                    <a
                      onClick={() => {
                        router.push("/user/dashboard");
                      }}
                    >
                      Mon espace
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-6 text-lg">
                    <Link href="/user/login">Se connecter</Link>
                  </li>
                  <li className="px-6 text-lg">
                    <Link href="/user/signup">S&apos;inscrire</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
