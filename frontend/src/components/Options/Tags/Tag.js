import React, { useEffect, useState } from 'react'

function Tag({tag, tagArray, setTagArray, startQuiz}) {
  
  const [checked, setChecked] = useState(false); 

  const addTag = (e)=>{
    setChecked(e.currentTarget.checked);

    const name = e.currentTarget.name.toLocaleLowerCase().replace(/\s/g, "_").replace("&", "and");
  
    if(e.currentTarget.checked){
      const newArray = [...tagArray];
      if(!newArray.includes(name)){
        setTagArray([...tagArray, name]);
      };
    }else{
      const newArray = [...tagArray];
      const index = newArray.indexOf(name);
      if (index > -1) { // only splice array when item is found
        newArray.splice(index, 1);
      };
      setTagArray(newArray);
    };
  };

  useEffect(() => {
    if(startQuiz){
      setChecked(false);
      setTagArray([]);
    };
  }, [startQuiz, setTagArray]);

  return (
    <label className='wrapper' htmlFor={tag}>
      <div>
        <input id={tag} name={tag} type="checkbox" checked={checked} onChange={addTag}/>
        <label htmlFor={tag}> {tag}</label>
      </div>
    </label>
  )
}

export default Tag
