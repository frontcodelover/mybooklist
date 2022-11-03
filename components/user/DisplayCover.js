import React from 'react'
import FetchCover from './FetchCover'

export default function DisplayCover({ tab, listId }) {

    function filterByListId(obj) {
        if (obj.id === listId) {
            return true
        }
    }

    const tabFilter = tab.filter(filterByListId)


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
