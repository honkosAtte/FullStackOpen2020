import React, { useState, useEffect } from 'react';
import axios from 'axios'

const OneItemButton = ({stateOfTheRow, setOneState}) => (
  <button onClick={() => setOneState( {
    name: stateOfTheRow.name,
    capital: stateOfTheRow.capital,
    population: stateOfTheRow.population,
    languages: stateOfTheRow.languages.map(lang => lang.name),
    imageUrl: stateOfTheRow.flag
    })
    
  }>Show details</button>
)

const OneItem = ({oneState}) => (
<>
  <h1>{oneState.name}</h1>
  
  <p>capital {oneState.capital}</p>
  
  <p>population {oneState.population}</p> 
  
  <b>languages</b>
  <ul>{oneState.languages.map(lang => <li key={lang}>{lang}</li>)}</ul> 
  
  <img src={oneState.imageUrl} height='220px'/>
  
  </>)

const App = () => {
 const [states, setStates] = useState([])
 const [filteredStates, setFilteredStates] = useState([])
 const [filterInputState, setFilterInputState] = useState([])
const [oneState, setOneState] = useState({ name: '',
  capital: '',
  population: '',
  languages: ['', ''],
  imageUrl: ''})



 const handleInputChange = (e) => {
  setFilterInputState(e.target.value)
  let filtered = []
  if(filterInputState.length > 0)
  filtered = states.filter(row => row.name.toLowerCase().includes(filterInputState.toLowerCase()))
  if (filtered && filtered.length > 0)
  setFilteredStates(filtered)

  if (filtered.length === 1)
  {
    const obj = filtered[0]
    console.log('obj', obj)
    const lang = obj.languages.map(lang => lang.name)
    console.log('lang', lang)

  setOneState(
    {
      name: obj.name,
      capital: obj.capital,
      population: obj.population,
      languages: lang,
      imageUrl: obj.flag
      }
    
    )
 }
  console.log('onState', oneState)
}

 useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(
    response => {
      setStates(response.data)
    }  
  )
}, [])

  return (
    <div>
      <input placeholder='search' value={filterInputState} onChange={handleInputChange}/>
      <br/>
   {/* <ul>{states.map((row) => <p key={row.name}>{row.name}</p>)}</ul> */}
{filterInputState.length > 0 
&& filteredStates.length > 1 
&& filteredStates.length < 11 ? 
filteredStates.map((row) => <> <li key={row.name}>{row.name} <OneItemButton stateOfTheRow={row} setOneState={setOneState}/></li> </>) : <p/>}
{filterInputState.length > 0 && filteredStates.length > 10 ? 'Too many matches, please specify': <p></p>}

{oneState.name !== '' ? <OneItem oneState={oneState}/> : <p></p>}



    </div>
  )
}

export default App;