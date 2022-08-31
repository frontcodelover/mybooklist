import React from 'react'
import { useRouter } from 'next/router';
import GetSingleBook from '../../../components/Books/GetSingleBook';

export default function details() {

    const router = useRouter();
    const { id } = router.query;

  return (
    <div><GetSingleBook id={id} /></div>
  )
}
