import React, { useRef, useState } from 'react';
import Category from './Categories/Category';
import Difficulty from './Difficulties/Difficulty';
import Tag from './Tags/Tag';
import './Options.css'

function Options({categories, setCategoryKey, difficulties, setDifficultyKey, limitKey, setLimitKey, tags, setTagKey, startQuiz, setStartQuiz}) {

  const [clickedCat, setClickedCat] = useState(false);
  const [clickedDif, setClickedDif] = useState(false);
  const [clickedTag, setClickedTag] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const [difficultyArray, setDifficultyArray] = useState("");
  const [tagArray, setTagArray] = useState([]);

  const numberLimit = useRef(null);

  const startQuizLoad = () => {
    const selectedCategories = categoryArray.toString();
    if(selectedCategories !== ""){
      setCategoryKey("categories=" + selectedCategories);
    }else{
      setCategoryKey(selectedCategories);
    };

    const selectedDifficulty = difficultyArray.toString();
    if(selectedDifficulty !== ""){
      setDifficultyKey("difficulty=" + selectedDifficulty);
    }else{
      setDifficultyKey(selectedDifficulty);
    };

    const selectedTags = tagArray.toString();
    if(selectedTags !== ""){
      setTagKey("tags=" + selectedTags);
    }else{
      setTagKey(selectedTags);
    };

    setStartQuiz(true);
    
    setClickedCat(false);
    setClickedDif(false);
    setClickedTag(false);

    numberLimit.current.style.background = 'linear-gradient(to right, #006D77 0%, #006D77 25%, #fff 25%, #fff 100%)';
  };


  const moveInputRangeSliderColor = (e) => {
    let rangeValue = (e.currentTarget.value-e.currentTarget.min)/(e.currentTarget.max-e.currentTarget.min)*100;
    e.currentTarget.style.background = 'linear-gradient(to right, #006D77 0%, #006D77 ' + rangeValue + '%, #fff ' + rangeValue + '%, #fff 100%)';
  };

  return (
    <div className={!startQuiz ? "options" : "hidden"} >
      <h2>Choose your preferences!</h2>

      <section id='category'>
        <button className={clickedCat ? "clicked" : ""} onClick={()=>{setClickedCat(prevCheck => !prevCheck); setClickedDif(false); setClickedTag(false)}}>Category</button>
        <ul className={clickedCat ? "" : "hidden"}>
          {Object.keys(categories).map((category, index)=>
            <Category category={category} categoryArray={categoryArray} setCategoryArray={setCategoryArray} startQuiz={startQuiz} key={index} />
          )}
        </ul>
        <p className='subtext'>Primary category of each question</p>
      </section>

      <section id='difficulty'>
        <button className={clickedDif ? "clicked" : ""} onClick={()=>{setClickedDif(prevCheck => !prevCheck); setClickedCat(false); setClickedTag(false)}}>Difficulty</button>
        <ul className={clickedDif ? "" : "hidden"}>
          {difficulties.map((difficulty, index)=>
            <Difficulty difficulty={difficulty} difficultyArray={difficultyArray} setDifficultyArray={setDifficultyArray} startQuiz={startQuiz} key={index} />
          )}
        </ul>
        <p className='subtext'>Easy, medium or hard (default is random)</p>
      </section>
      
      <section id='number'>
        <label htmlFor='limit'>Limit {limitKey}</label>
        <input id='limit' type="range" min="1" max="20" value={limitKey} ref={numberLimit} onInput={(e)=>{moveInputRangeSliderColor(e)}} onChange={(e)=>{setLimitKey(e.currentTarget.value)}}/>
        <p className='subtext'>Number of questions</p>
      </section>

      <section id='tag'>
        <button className={clickedTag ? "tags-clicked" : ""} onClick={()=>{setClickedTag(prevCheck => !prevCheck); setClickedCat(false); setClickedDif(false)}}>Tags</button>
        <ul className={clickedTag ? "tags" : "hidden"}>
          {tags.map((tag, index)=>
            <Tag tag={tag} tagArray={tagArray} setTagArray={setTagArray} startQuiz={startQuiz} key={index} />
          )}
        </ul>
        <p className='subtext'>Subcategories for this question</p>
      </section>

      <button id='start-btn' onClick={startQuizLoad}>Start Quiz</button>
    
    </div>
  );
};

export default Options;
