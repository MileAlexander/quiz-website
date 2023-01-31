import React, { useEffect, useState } from 'react';
import Answer from './Answer';

function Question({question, setGoodAnswer, goodAnswer, setBadAnswer, badAnswer, number, quizLength}) {

    const [visible, setVisible] = useState(true);
    const [shuffledAnswer, setShuffledAnswer] = useState([]);
    const [answered, setAnswered] = useState("unblock");

    useEffect(() => {
        setVisible(true);

        let answerArray = question.incorrectAnswers.concat(question.correctAnswer);
        //The Fisher-Yates algorithm
        const shuffleArray = array => {
            for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            };
        };
        shuffleArray(answerArray);
        setShuffledAnswer(answerArray);
    }, [question])

    const clickedCorrect = ()=>{
        console.log("correct");
        setAnswered("block");
        setGoodAnswer(goodAnswer + 1);
        setTimeout(()=>{
            setAnswered("unblock");
            setVisible(false);
        }, 1000);
    };
    const clickedIncorrect = ()=>{
        setAnswered("block");
        console.log("incorrect");
        setBadAnswer(badAnswer + 1);
        setTimeout(()=>{
            setAnswered("unblock");
            setVisible(false);
        }, 1000);
    };

    
    
  return (
    <>
        {visible && <div className='quiz-card'>
            <h1>{question.question}</h1>
            <p>{number}/{quizLength}</p>
            <div className={answered}></div>
            <section>
                {shuffledAnswer.map((answer, index) =>
                    <Answer answer={answer} correct={question.correctAnswer} clickedCorrect={clickedCorrect} clickedIncorrect={clickedIncorrect} key={index} />
                    )}
            </section>
            <h3>Category: {question.category}</h3>
            <h4>Difficulty: {question.difficulty !== undefined ? question.difficulty : "N/A"}</h4>
        </div>}
    </>
  );
};

export default Question;
