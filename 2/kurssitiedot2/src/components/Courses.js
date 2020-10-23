import React from 'react';
import Content from './Content'

const Courses = ({courses}) => {

  return (
    <div>
     {courses.map(course => <Content course={course}/>)} 
    </div>
  )
}



export default Courses;












