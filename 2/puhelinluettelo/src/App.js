import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import ContactForm from './components/ContactForm'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newnumber, setNewnumber ] = useState('')
  const [ filteredResults, setFilteredResults] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState([{}])

useEffect(() => {
  axios.get('http://localhost:3001/persons')
  .then(
    response => {
      console.log(response.data)
      setPersons(response.data)}  
  )
}, [])



  const handleSubmit = (e) => {
  const nameIsAlreadyInThenumberBook = persons.map(person => person.name === newName).some(bool => bool)

    if(nameIsAlreadyInThenumberBook)
    {
      alert(`${newName} is already added to numberbook`);
      e.preventDefault();
      setNewName('');
    return;
    }
    e.preventDefault();
    const nameObject = {name : newName, number : newnumber};
    setPersons(persons.concat(nameObject)); 
    setNewName('')
    setNewnumber('')
  }



  const handleChange = (e) => {setNewName(e.target.value)}
  const handlenumberChange = (e) => {setNewnumber(e.target.value)}

  const handleFiltering = (e) => {
    setFilteredResults(e.target.value)
    if(filteredResults.length > 1)
    setFilteredPersons(persons.filter(row => row.name.toLowerCase().includes(filteredResults.toLowerCase())))
  }


  return (
    <div>
      <h2>numberbook</h2>
      <Filter filteredResults={filteredResults} handleFiltering={handleFiltering} />
      <ContactForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newnumber={newnumber} handlenumberChange={handlenumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredResults={filteredResults} filteredPersons={filteredPersons} persons={persons}/>
    </div>
  )

}

export default App