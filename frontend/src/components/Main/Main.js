import React, { useEffect, useState } from "react";
import Landing from "../../Landing/Landing";
import Loading from "../Loading/Loading";
import Options from "../Options/Options";
import Questions from "../Questions/Questions";

function Main() {
 
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startQuiz, setStartQuiz] = useState(false);
    const [categories, setCategories] = useState({});
    const [categoryKey, setCategoryKey] = useState("");
    const difficulties = ["easy", "medium", "hard"];
    const [difficultyKey, setDifficultyKey] = useState("");
    const [limitKey, setLimitKey] = useState(5);
    const [tags, setTags] = useState([]);
    const [tagKey, setTagKey] = useState("");
    
    useEffect (()=>{
      const getCategories = async ()=>{
        const respon = await fetch('https://the-trivia-api.com/api/categories');
        const data = await respon.json();
        setCategories(data);
      };
      getCategories();
    }, []);
    
    useEffect (()=>{
      const getTags = async ()=>{
        const respon = await fetch('https://the-trivia-api.com/api/tags');
        const data = await respon.json();
        setTags(data);
      };
      getTags();
    }, []);
    
    useEffect (()=>{
      const getQuiz = async ()=>{
        setLoading(true)
        const respon = await fetch(`https://the-trivia-api.com/api/questions?${categoryKey}&limit=${limitKey}&${difficultyKey}&${tagKey}`);
        const data = await respon.json();
        setQuiz(data);
        setLoading(false)
      };
      if(startQuiz === true){
        getQuiz();
      };
    }, [startQuiz, categoryKey, limitKey, difficultyKey, tagKey]);
    
    return (
      <div className="App">
        <Landing />
        {loading && <Loading />}
        <Options
        categories={categories}
        setCategoryKey={setCategoryKey}
        difficulties={difficulties}
        setDifficultyKey={setDifficultyKey}
        limitKey={limitKey}
        setLimitKey={setLimitKey}
        tags={tags}
        setTagKey={setTagKey}
        setStartQuiz={setStartQuiz}
        startQuiz={startQuiz}
        />
        <Questions quiz={quiz} setStartQuiz={setStartQuiz} setLimitKey={setLimitKey} />
      </div>
    );
};

export default Main





