import React, { useEffect } from 'react'


function Difficulty({difficulty, difficultyArray, setDifficultyArray, startQuiz}) {
  
  const addDifficulty = (e)=>{

    const name = e.currentTarget.name;

    setDifficultyArray(name)
  };

  useEffect(() => {
    if(startQuiz){
      setDifficultyArray("")
    };
  }, [startQuiz, setDifficultyArray])

  return (
    <label className='wrapper' htmlFor={difficulty}>
      <div>
        <input id={difficulty} name={difficulty} type="radio" checked={difficultyArray === difficulty} onChange={addDifficulty}/>
        <label htmlFor={difficulty}> {difficulty}</label>
      </div>
    </label>
  )
}

export default Difficulty
