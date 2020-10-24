import React from 'react'

const Persons = ({filteredResults, filteredPersons, persons}) => {

  return (
      <div>
            {filteredResults.length > 1 ? 
      filteredPersons.map(person => <p key={person.phone}>{person.name} {person.phone}</p>) 
      : persons.map(person => <p key={person.phone}>{person.name} {person.phone}</p>)}
      </div>
  )

}

export default Persons
