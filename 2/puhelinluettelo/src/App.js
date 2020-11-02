import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import ContactForm from './components/ContactForm'
import phonebookService from './services/phonebookService'
import './App.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newnumber, setNewnumber] = useState('')
  const [filteredResults, setFilteredResults] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([{}])
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {

    phonebookService.getAll()
      .then(response => {
        setPersons(response)
      })

  }, [])



  const BetterSucceedMessage = ({ message, isError }) => {
    if (message === '') { return (<p></p>) }
    if (isError) { return (<p class='error'>{message}</p>) }

    return (<p class='success'>{message}</p>)


  }

  const handleSubmit = (e) => {
    const nameIsAlreadyInThenumberBook = persons.map(person => person.name === newName).some(bool => bool)

    if (nameIsAlreadyInThenumberBook) {
      const updatePhoneNumber = window.confirm(`${newName} seems to be already added to numberbook. Do you want to update phone number?`);
      if (updatePhoneNumber) {
        e.preventDefault();
        const updateNameObject = { name: newName, number: newnumber };
        const idOfUpdateObject = persons.find(person => person.name === newName).id

        phonebookService.update(idOfUpdateObject, updateNameObject)
          .then(returnedObject => {
            if (returnedObject === null) {
              setPersons(persons.filter(person => person.id !== idOfUpdateObject));
              setNewName('')
              setNewnumber('')
              setIsError(true)
              setMessage(`${updateNameObject.name}'s info was already deleted`)
              setTimeout(() => setMessage(''), 3000)
              setTimeout(() => setIsError(false), 3000)
              setPersons(persons.filter(person => person.id !== idOfUpdateObject))
            } else {
              setPersons(persons.map(person => person.id !== idOfUpdateObject ? person : returnedObject));
              setNewName('')
              setNewnumber('')
              setMessage(`${updateNameObject.name}'s phonenumber now successfully updated`)
              setTimeout(() => setMessage(''), 3000)
            }
          }).catch(error => {
            console.log('ErrorfoPost', error)
            setNewName('')
            setNewnumber('')
            setIsError(true)
            setMessage(`${error.response.data.error}`)
            setTimeout(() => setMessage(''), 3000)
            setTimeout(() => setIsError(false), 3000)
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
        setMessage(`${nameObject.name} is now successfully added to phonebook`)
        setTimeout(() => setMessage(''), 3000)
      }).catch(error => {
        setNewName('')
        setNewnumber('')
        setIsError(true)
        setMessage(`${error.response.data.error}`)
        console.log('ErrorForPost', error.response.data.error)
        setTimeout(() => setMessage(''), 3000)
        setTimeout(() => setIsError(false), 3000)
      });

  }



  const handleChange = (e) => { setNewName(e.target.value) }
  const handlenumberChange = (e) => { setNewnumber(e.target.value) }


  const handleDelete = (id) => {
    phonebookService.deleteItem(id)
      .then(response => {
        console.log('Errors? ', response.error !== undefined)
        setMessage(`${persons.find(row => row.id === id).name} is now successfully deleted`)
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => setMessage(''), 3000)
      }).catch(error => {
        setIsError(true)
        setMessage(`${persons.find(row => row.id === id).name} was already deleted from server`)
        setTimeout(() => setMessage(''), 3000)
        setTimeout(() => setIsError(false), 3000)
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
      <BetterSucceedMessage message={message} isError={isError} />
      <Filter filteredResults={filteredResults} handleFiltering={handleFiltering} />
      <ContactForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newnumber={newnumber} handlenumberChange={handlenumberChange} />
      <h2>Numbers</h2>
      <Persons filteredResults={filteredResults} filteredPersons={filteredPersons} persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App