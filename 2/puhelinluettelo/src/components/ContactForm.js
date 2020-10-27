import React from 'react'

const ContactForm = ({handleSubmit, newName, handleChange, newnumber, handlenumberChange}) => {

  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleChange}/>
    </div>
    <div>
      phone: <input value={newnumber} onChange={handlenumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default ContactForm

