import React from 'react'

const Filter = ({ filteredResults, handleFiltering }) => {

  return (
    <div>
      filter shown with <input value={filteredResults} onChange={handleFiltering} />
    </div>
  )

}

export default Filter
