import React, { useState } from 'react';

function Answer({answer, correct, clickedCorrect, clickedIncorrect}) {
  const [answerClicked, setAnswerClicked] = useState("");

  const clicked = ()=>{
      if(answer === correct){
        setAnswerClicked("correct")
        clickedCorrect();
      }else{
        setAnswerClicked("incorrect")
        clickedIncorrect();
      };
  };
  
  return (
    <div className='answer'>
      <button className={answerClicked} onClick={clicked}>{answer}</button>
    </div>
  );
};

export default Answer;
