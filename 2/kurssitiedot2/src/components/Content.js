import React from 'react';
import Part from './Part'
import Total from './Total'

const Content = ({course}) => {

  return (
    <div>
     <Part course={course}/>
     <Total course={course}/>
    </div>
  )
}


export default Content;