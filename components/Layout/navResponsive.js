import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import logoLecture from "../../public/logoLecture.png";
import Search from "../Home/Search";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import avatar from "../../public/avatar.png";
import React, { useEffect, useState } from "react";
import GetUserImage from "../User/GetUserImage";

const navigation = [{ name: "Rechercher un livre", href: "/books" }];

const navigationUserConnected = [
  { name: "Mon espace", href: "/user/dashboard" },
  { name: "Paramètres", href: "/user/logout" },
];

const navigationUserNotConnected = [
  { name: "Se connecter", href: "/user/login" },
  { name: "S'inscrire", href: "/user/signup" },
];

export default function NavResponsive() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Popover>
      <div className="relative pt-6">
        <nav
          className={`relative flex items-center justify-between sm:h-10 px-5`}
          aria-label="Global"
        >
          <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/">
                {/* <span className="sr-only">Your Company</span> */}
                <span className="font-bold text-xl">
                  <a>
                    <div className="h-auto w-32">
                      <Link href="/">
                        <a>
                          <Image src={logoLecture} alt="logo lecture" />
                        </a>
                      </Link>
                    </div>
                  </a>
                </span>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:ml-10 md:flex md:space-x-8 justify-center items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-semibold text-main-color hover:text-purple-700"
              >
                {item.name}
              </a>
            ))}
            {user ? (
              <>
                <div className="cursor-pointer flex justify-between">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 focus:outline-none focus ">
                    <GetUserImage user={user.uid} size={40} />
                  </Popover.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-100"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="absolute right-0 w-56 mt-4 origin-top-right bg-white rounded-md shadow-lg z-10">
                    <Popover.Panel
                      focus
                      className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition"
                    >
                      <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                          {navigationUserConnected.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                        <a
                          className="block w-full bg-gray-50 px-5 py-3 font-medium text-red-600 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            logout();
                            router.push("/");
                          }}
                        >
                          Se déconnecter
                        </a>
                      </div>
                    </Popover.Panel>
                  </div>
                </Transition>
              </>
            ) : (
              <>
                <div className="cursor-pointer flex justify-between">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 focus:outline-none focus ">
                   
                      <Image
                      src={avatar}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="avatar"
                    />
                  </Popover.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-100"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="absolute right-0 w-56 mt-4 origin-top-right bg-white rounded-md shadow-lg z-10">
                    <Popover.Panel
                      focus
                      className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition"
                    >
                      <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                          {navigationUserNotConnected.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </div>
                </Transition>
              </>
            )}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="#"
              className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
            >
              Log in
            </a>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
