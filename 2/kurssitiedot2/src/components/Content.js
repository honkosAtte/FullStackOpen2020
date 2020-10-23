import React from 'react';
import Part from './Part'
import Total from './Total'
import Header from './Header'


const Content = ({course}) => {

  return (
    <div>
    <Header course={course}/>
     <Part course={course}/>
     <Total course={course}/>
    </div>
  )
}


export default Content;