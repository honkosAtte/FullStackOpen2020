import React, { useState, useEffect } from 'react';
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY
const WeatherApiBaseUrl = 'http://api.weatherstack.com/current?access_key=' + apiKey + '&query='


const OneItemButton = ({stateOfTheRow, setOneState, weatherDataForCapital, setWeatherDataForCapital}) => (
  <button onClick={() => 
    {
    const weatherInfo = axios.get(WeatherApiBaseUrl+stateOfTheRow.capital)
    .then(response => {
    console.log(response)

    setWeatherDataForCapital(response.data.success !== false ? response.data.current.temperature : 'no data')})

    setOneState( {
    name: stateOfTheRow.name,
    capital: stateOfTheRow.capital,
    population: stateOfTheRow.population,
    languages: stateOfTheRow.languages.map(lang => lang.name),
    imageUrl: stateOfTheRow.flag
    })}
    
  }>Show details</button>
)

const OneItem = ({oneState, weatherDataForCapital}) => {
  return(
<>
  <h1>{oneState.name}</h1>
  
  <p>capital {oneState.capital}</p>
  
  <p>population {oneState.population}</p> 
  
  <b>languages</b>
  <ul>{oneState.languages.map(lang => <li key={lang}>{lang}</li>)}</ul> 
  
  <img src={oneState.imageUrl} height='220px'/>
  
  {weatherDataForCapital!== 'no data' ? <p>temperature in {oneState.capital}: {weatherDataForCapital} Celsius</p> : <p></p>}
  </>)}

const App = () => {
 const [states, setStates] = useState([])
 const [filteredStates, setFilteredStates] = useState([])
 const [filterInputState, setFilterInputState] = useState([])
const [oneState, setOneState] = useState({ name: '',
  capital: '',
  population: '',
  languages: ['', ''],
  imageUrl: ''})

  const [weatherDataForCapital, setWeatherDataForCapital] = useState()


 const handleInputChange = (e) => {
  setFilterInputState(e.target.value)
  let filtered = []
  if(filterInputState.length > 0)
  filtered = states.filter(row => row.name.toLowerCase().includes(filterInputState.toLowerCase()))
  if (filtered && filtered.length > 0)
  setFilteredStates(filtered)

//   if (filtered.length === 1)
//   {
//     const obj = filtered[0]
//     console.log('obj', obj)
//     const lang = obj.languages.map(lang => lang.name)
//     console.log('lang', lang)

//   setOneState(
//     {
//       name: obj.name,
//       capital: obj.capital,
//       population: obj.population,
//       languages: lang,
//       imageUrl: obj.flag
//       }
    
//     )
//  }
//   console.log('onState', oneState)
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

{filterInputState.length > 0 
&& filteredStates.length > 1 
&& filteredStates.length < 11 ? 
filteredStates.map((row) => <> <li key={row.name}>{row.name} <OneItemButton stateOfTheRow={row} setOneState={setOneState} weatherDataForCapital={weatherDataForCapital} setWeatherDataForCapital={setWeatherDataForCapital}/></li> </>) : <p/>}
{filterInputState.length > 0 && filteredStates.length > 10 ? 'Too many matches, please specify': <p></p>}

{oneState.name !== '' ? <OneItem oneState={oneState} weatherDataForCapital={weatherDataForCapital}/> : <p></p>}



    </div>
  )
}

export default App;