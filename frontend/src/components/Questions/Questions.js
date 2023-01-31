import React, { useState, useEffect } from 'react'
import Question from './Question'
import './Questions.css'

function Questions({quiz, setStartQuiz, setLimitKey}) {

    const [quizLength, setQuizLength] = useState(0)
    const [goodAnswer, setGoodAnswer] = useState(0)
    const [badAnswer, setBadAnswer] = useState(0)
    const [result, setResult] = useState("")
    const [resultInPercent, setResultInPercent] = useState("")
    
    useEffect (()=>{
        setQuizLength(quiz.length)
    
        if(quizLength !== 0 && goodAnswer + badAnswer === quizLength){
          setTimeout(()=>{
            setResult(goodAnswer + '/' + quizLength);
          }, 1000);
          setResultInPercent((goodAnswer/quizLength*100).toFixed(2) + '%');
        }
        
    }, [quiz.length, goodAnswer, badAnswer, quizLength]);
    
    let i = quizLength;

    const resetParams = ()=>{
      setStartQuiz(false);
      setResult("");
      setGoodAnswer(0);
      setBadAnswer(0);
      setLimitKey(5);
    };
    
  return (
    <div className='quiz-box'>
      {quiz.map((question, index) => 
        <Question
            question={question}
            setGoodAnswer={setGoodAnswer}
            goodAnswer={goodAnswer}
            setBadAnswer={setBadAnswer}
            badAnswer={badAnswer}
            number={i--}
            quizLength={quizLength}
            key={index}
        />
      )}
      {result !== "" && 
      <>
        <p className='result'>{result}<br/>{resultInPercent} correct answer</p>
        <button className='back-btn' onClick={resetParams}>Back to main page</button>
      </>}
    </div>
  )
}

export default Questions
