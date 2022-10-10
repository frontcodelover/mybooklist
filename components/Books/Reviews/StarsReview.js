import React from 'react'
import {RiStarSFill} from 'react-icons/ri'

export default function StarsReview({note}) {


  let tab = []

  function displayStars(note) {
    for (let i = 0; i < note; i++) {
      tab.push(<RiStarSFill key={i}/>)
    }
  }

  displayStars(note)

  console.log("TAB",tab)
  
  return (
    <>
    <div className='flex'>
    {tab}
    </div>
    </>
  )
}
