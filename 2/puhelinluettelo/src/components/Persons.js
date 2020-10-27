import React from 'react'

const Persons = ({ filteredResults, filteredPersons, persons, handleDelete }) => {
  const DeleteButton = ({ person, handleDelete }) => <button onClick={() => {
    const deleteTrue = window.confirm(`Do you want to delete ${person.name} from phonebook?`)
    if (deleteTrue) {
      handleDelete(person.id)
    }
    console.log(person.id)
  }}>delete</button>
  return (
    <div>
      {filteredResults.length > 1 ?
        filteredPersons.map(person => <div key={person.id}><p >{person.name} {person.number}</p> <DeleteButton person={person} handleDelete={handleDelete} /></div>)
        : persons.map(person => <div key={person.id}><p key={person.id}>{person.name} {person.number} </p> <DeleteButton person={person} handleDelete={handleDelete} /></div>)}
    </div>
  )

}

export default Persons