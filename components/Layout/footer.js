/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function footer() {
  return (
    <>
      <footer className='relative bg-main-color pt-8 pb-6 text-gray-50 border-t-8 border-t-purple-500'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap text-left lg:text-left'>
            <div className='w-full lg:w-6/12 px-4'>
              <h4 className='text-3xl font-semibold'>Lisez plus, apprenez plus !</h4>
							<h5 className='text-lg mt-0 mb-2 text-blueGray-600'>des listes de livres à votre image</h5>
							Ce site est juste un projet de dev pour le pur plaisir.
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='flex flex-wrap items-top mb-6'>
                <div className='w-full lg:w-4/12 px-4 ml-auto'>
                  <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>Liens utiles</span>
                  <ul className='list-unstyled'>
                    <li>
                      <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm' href='https://frontcodelover.vercel.app/'>
                        A propos{' '}
                      </a>
                    </li>
                    <li>
                      <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm' href='https://github.com/frontcodelover/mybooklist'>
                        Github
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='w-full lg:w-4/12 px-4'>
                  <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>Autres informations</span>
                  <ul className='list-unstyled'>
                    <li>
                      <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm' href='https://frontcodelover.vercel.app/'>
                        Conditions d'utilisation
                      </a>
                    </li>
                    <li>
                      <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm' href='https://frontcodelover.vercel.app/'>
                        Qui suis-je ?
                      </a>
                    </li>
                    <li>
                      <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm' href='https://frontcodelover.vercel.app/'>
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='my-6 border-blueGray-300' />
          <div className='flex flex-wrap items-center md:justify-between justify-center'>
            <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
              <div className='text-sm text-blueGray-500 font-semibold py-1'>
                Fabriqué avec passion depuis <span id='get-current-year'>2022 - </span>
                <a href='https://github.com/frontcodelover/mybooklist' className='text-blueGray-500 hover:text-blueGray-800'>
                  FrontCodeLover
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
