/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Image from 'next/image';
import avatar from '../../public/avatar.png';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import logoLectureNew from '../../public/logo-listedelecture.png';
import GetUserImage from '../Users/GetUserImage';

const navigation = [{ name: 'Rechercher un livre', href: '/books' }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Disclosure as='nav' className='bg-white'>
      {({ open }) => (
        <>
          <div className='mx-auto lg:max-w-screen-xl px-4 sm:px-6'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-main-color hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <div className='h-auto w-28'>
                    <Link href='/'>
                      <Image src={logoLectureNew} alt='logo lecture' />
                    </Link>
                  </div>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(item.current ? 'bg-white text-main-color' : 'text-main-color', 'px-3 py-2 rounded-md text-md font-medium')}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <button
                  type='button'
                  className='rounded-full bg-white p-1 text-main-color/50 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full bg-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Open user menu</span>
                      {user ? <GetUserImage user={user.uid} width={40} height={40} /> : <Image src={avatar} width={40} height={40} className='rounded-full' alt='avatar' />}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    {user ? (
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/user/dashboard' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-md text-main-color')}>
                              Mon espace
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/books' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-md text-main-color')}>
                              Rechercher un livre
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            className='block w-full bg-gray-50 px-5 py-3 font-medium text-red-600 hover:bg-gray-100 cursor-pointer'
                            onClick={() => {
                              logout();
                              router.push('/');
                            }}
                          >
                            Se déconnecter
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    ) : (
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/user/login' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-md text-main-color')}>
                              Se connecter
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/user/signup' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-md text-main-color')}>
                              S'inscrire
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    )}
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-main-color hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
