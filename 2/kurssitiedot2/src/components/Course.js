import React from 'react';
import Content from './Content'

const Course = ({courses}) => {

  return (
    <div>
     {courses.map(course => <Content course={course}/>)} 
    </div>
  )
}



export default Course;












