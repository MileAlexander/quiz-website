import React, { useState } from 'react'
import './Landing.css'

function Landing() {
    const [start, setStart] = useState(false);

  return (
    <div className={start ? 'hidden' : 'landing'}>
        <h1>Q-ease</h1>
        <h2>Quiz with ease!</h2>
        <p>A trivia based multiple choice quiz website.</p>
        <button onClick={()=>{setStart(true)}}>Let's play!</button>
    </div>
  );
};

export default Landing
