import React, { useEffect, useState } from 'react'

function Category({category, categoryArray, setCategoryArray, startQuiz}) {

  const [checked, setChecked] = useState(false);

  const addCategory = (e)=>{
    setChecked(e.currentTarget.checked);

    const name = e.currentTarget.name.toLocaleLowerCase().replace(/\s/g, "_").replace("&", "and");

    if(e.currentTarget.checked){
      const newArray = [...categoryArray];
      if(!newArray.includes(name)){
        setCategoryArray([...categoryArray, name]);
      };
    }else{
      const newArray = [...categoryArray];
      const index = newArray.indexOf(name);
      if (index > -1) { // only splice array when item is found
        newArray.splice(index, 1);
      };
      setCategoryArray(newArray);
    };
  };

  useEffect(() => {
    if(startQuiz){
      setChecked(false);
      setCategoryArray([]);
    };
  }, [startQuiz, setCategoryArray]);
  
  return (
    <label className='wrapper' htmlFor={category}>
      <div className='categories'>
        <input id={category} name={category} type="checkbox" checked={checked} onChange={addCategory}/>
        <label htmlFor={category}> {category}</label>
      </div>
    </label>
  )
}

export default Category
