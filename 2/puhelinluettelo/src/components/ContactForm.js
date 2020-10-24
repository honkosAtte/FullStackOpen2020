import React from 'react'

const ContactForm = ({handleSubmit, newName, handleChange, newPhone, handlePhoneChange}) => {

  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleChange}/>
    </div>
    <div>
      phone: <input value={newPhone} onChange={handlePhoneChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default ContactForm

