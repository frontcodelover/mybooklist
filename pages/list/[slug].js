import React from 'react'
import { useRouter } from 'next/router'
import GetAllBooksFromTheList from '../../components/Lists/GetAllBooksFromTheList'


export default function List() {
  const router = useRouter()
  const { slug } = router.query



  return (
    <GetAllBooksFromTheList slug={slug} />
  )
}
