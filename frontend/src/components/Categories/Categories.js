import React from 'react'
import Category from './Category'

function Categories({categories, setCategoryKey}) {
  return (
    <div>
      {Object.keys(categories).map((category, index)=>
        <Category category={category} setCategoryKey={setCategoryKey} key={index} />
      )}
    </div>
  )
}

export default Categories
