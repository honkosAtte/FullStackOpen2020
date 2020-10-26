import React from 'react'

const Persons = ({filteredResults, filteredPersons, persons}) => {

  return (
      <div>
            {filteredResults.length > 1 ? 
      filteredPersons.map(person => <p key={person.phone}>{person.name} {person.number}</p>) 
      : persons.map(person => <p key={person.phone}>{person.name} {person.number}</p>)}
      </div>
  )

}

export default Persons
