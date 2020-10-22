import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad, all, average, positive}) => {
  const hasValue = good !== 0 && neutral !== 0 && bad !==0;
 console.log(hasValue)

 if (good | neutral | bad){
  return (
    <>
<h1>stats</h1>

<StatisticsLine text="good" value={good} />
<StatisticsLine text="neutral" value={neutral} />
<StatisticsLine text="bad" value={bad} />
<StatisticsLine text="all" value={all} />
<StatisticsLine text="average" value={average/all} />
<StatisticsLine text="positive" value={positive/all * 100 + ' %'} />
  
  </>)}
  else 
  {
    return (<><h1>stats</h1> No feedback given</>) 
  }
}

const StatisticsLine = ({text, value}) => <p>{text} {value}</p>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

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
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

<Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} average={average}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


