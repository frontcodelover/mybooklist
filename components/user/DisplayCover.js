import React from 'react'
import FetchCover from './FetchCover'

export default function DisplayCover({ tab, listId }) {
    console.log("TAB", tab)
    console.log("listID", listId)


    function filterByListId(obj) {
        if (obj.id === listId) {
            return true
        }
    }

    const tabFilter = tab.filter(filterByListId)

    console.log("FILTER",tabFilter)

  return (
      <>
          {tabFilter.map((r) => (
              <div key={r.bookid}>
              <FetchCover bookid={r.bookid} />
            </div>
      ))}
      </>
  )
}
