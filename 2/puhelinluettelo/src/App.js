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

  
  useEffect(() => {

    phonebookService.getAll()
      .then(response => {
        setPersons(response)
      })

  }, [])



  const BetterSucceedMessage = ({ message }) => {
    if (message === '') { return (<p></p>) }
    // Onhän tää vähän nolo, mutta toimii:
    if (message.includes('already')) { return (<p class='error'>{message}</p>) }

    return (<p class='success'>{message}</p>)


  }

  const handleSubmit = (e) => {
	const test = [] 
	
	phonebookService.getAll()
      .then(response => {
		console.log(test)
		//Tämä jäi vielä kesken, pitänee käyttä jotain hookia?
      })
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
            setMessage(`${updateNameObject.name}'s phonenumber now successfully updated`)
          setTimeout(() => setMessage(''), 3000)
          }).catch(error => {
            setMessage(`${updateNameObject.name} was already deleted from server`)
            setTimeout(() => setMessage(''), 3000)
            setPersons(persons.filter(person => person.id !== idOfUpdateObject))
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
      });

  }



  const handleChange = (e) => { setNewName(e.target.value) }
  const handlenumberChange = (e) => { setNewnumber(e.target.value) }


  const handleDelete = (id) => {
    //console.log('delete this' + id)
    //console.log('name', persons.find(row => row.id === id).name)
    phonebookService.deleteItem(id)
      .then(response => {
        console.log('Errors? ', response.error !== undefined)
        setMessage(`${persons.find(row => row.id === id).name} is now successfully deleted`)
		setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => setMessage(''), 3000)
      }).catch(error => {
        setMessage(`${persons.find(row => row.id === id).name} was already deleted from server`)
        setTimeout(() => setMessage(''), 3000)
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
      <BetterSucceedMessage message={message} />
      <Filter filteredResults={filteredResults} handleFiltering={handleFiltering} />
      <ContactForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newnumber={newnumber} handlenumberChange={handlenumberChange} />
      <h2>Numbers</h2>
      <Persons filteredResults={filteredResults} filteredPersons={filteredPersons} persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App