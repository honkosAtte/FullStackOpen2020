import React, { useState } from 'react'


import Filter from './components/Filter'
import Persons from './components/Persons'
import ContactForm from './components/ContactForm'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1231244' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filteredResults, setFilteredResults] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState([{}])

  const handleSubmit = (e) => {
  const nameIsAlreadyInThePhoneBook = persons.map(person => person.name === newName).some(bool => bool)

    if(nameIsAlreadyInThePhoneBook)
    {
      alert(`${newName} is already added to phonebook`);
      e.preventDefault();
      setNewName('');
    return;
    }
    e.preventDefault();
    const nameObject = {name : newName, phone : newPhone};
    setPersons(persons.concat(nameObject)); 
    setNewName('')
    setNewPhone('')
  }



  const handleChange = (e) => {setNewName(e.target.value)}
  const handlePhoneChange = (e) => {setNewPhone(e.target.value)}

  
  const handleFiltering = (e) => {
    setFilteredResults(e.target.value)
    if(filteredResults.length > 1)
    setFilteredPersons(persons.filter(row => row.name.toLowerCase().includes(filteredResults.toLowerCase())))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredResults={filteredResults} handleFiltering={handleFiltering} />
      <ContactForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons filteredResults={filteredResults} filteredPersons={filteredPersons} persons={persons}/>
    </div>
  )

}

export default App