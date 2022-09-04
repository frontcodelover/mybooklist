import React from 'react'
import { useRouter } from 'next/router';
import GetSingleBook from '../../../components/Books/GetSingleBook';

export default function details() {

    const router = useRouter();
    const { id } = router.query;

  return (
    <div className='container max-w-screen-xl mx-auto mt-4'><GetSingleBook id={id} /></div>
  )
}
