import React from 'react'

function Category({category, setCategoryKey}) {

    

  return (
    <div>
      <button onClick={(e)=>{setCategoryKey(e.currentTarget.innerHTML.toLocaleLowerCase().replace(/\s/g, "_").replace("&amp;", "and"))}}>{category}</button>
    </div>
  )
}

export default Category
