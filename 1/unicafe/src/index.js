import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad, all, average, positive}) => {
  const hasValue = good !== 0 && neutral !== 0 && bad !==0;
 console.log(hasValue)

 if (good | neutral | bad){
  return (
    <>
<h1>stats</h1>

good {good} <br/>
neutral {neutral} <br/>
bad {bad} <br/>
all {all} <br/>
average {average? average/all : 0} <br/>
positive {positive? positive/all * 100: 0} %
  
  </>)}
  else 
  {
    return (<><h1>stats</h1> No feedback given</>) 
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGood = () => {setGood(good + 1)
  setAll(all+1)
  setPositive(positive+1)
  setAverage(average+1)
};
const handleNeutral = () => {setNeutral(neutral +1)
  setAll(all+1)
  setPositive(positive+0)
  setAverage(average+0)
};
const handleBad = () => {setBad(bad + 1)
setAll(all+1) 
setAverage(average-1)
};;


  return (
    <div>
      
      <h1>give feedback</h1>
<button onClick={handleGood}>good</button>
<button onClick={handleNeutral}>neutral</button>
<button onClick={handleBad}>bad</button>

<Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} average={average}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


