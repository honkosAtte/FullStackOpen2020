import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import ContactForm from './components/ContactForm'
import phonebookService from './services/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newnumber, setNewnumber] = useState('')
  const [filteredResults, setFilteredResults] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([{}])

  useEffect(() => {

    phonebookService.getAll()
      .then(response => {
        setPersons(response)
      })

  }, [])



  const handleSubmit = (e) => {
    const nameIsAlreadyInThenumberBook = persons.map(person => person.name === newName).some(bool => bool)

    if (nameIsAlreadyInThenumberBook) {
      const updatePhoneNumber = window.confirm(`${newName} is already added to numberbook. Do you want to update phone number?`);
      if (updatePhoneNumber) {
        e.preventDefault();
        const updateNameObject = { name: newName, number: newnumber };
        const idOfUpdateObject = persons.find(person => person.name === newName).id

        phonebookService.update(idOfUpdateObject, updateNameObject)
          .then(returnedObject => {
            setPersons(persons.map(person => person.id !== idOfUpdateObject ? person : returnedObject));
            setNewName('')
            setNewnumber('')
          });

      }
      e.preventDefault();
      setNewName('');
      setNewnumber('')
      return;
    }
    e.preventDefault();
    const nameObject = { name: newName, number: newnumber };


    phonebookService.create(nameObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject));
        setNewName('')
        setNewnumber('')
      });

  }



  const handleChange = (e) => { setNewName(e.target.value) }
  const handlenumberChange = (e) => { setNewnumber(e.target.value) }


  const handleDelete = (id) => {
    console.log('delete this' + id)
    phonebookService.deleteItem(id)
      .then(confirm => {
        console.log('confirmDelete', confirm)
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        alert(
          `the person with id ${id} was already deleted from server`
        )
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleFiltering = (e) => {
    setFilteredResults(e.target.value)
    if (filteredResults.length > 1)
      setFilteredPersons(persons.filter(row => row.name.toLowerCase().includes(filteredResults.toLowerCase())))
  }


  return (
    <div>
      <h2>numberbook</h2>
      <Filter filteredResults={filteredResults} handleFiltering={handleFiltering} />
      <ContactForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newnumber={newnumber} handlenumberChange={handlenumberChange} />
      <h2>Numbers</h2>
      <Persons filteredResults={filteredResults} filteredPersons={filteredPersons} persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App