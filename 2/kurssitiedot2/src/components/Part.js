import React from 'react';
const Part = ({course}) => {

  return (
    <div>
      <ul>
    {course.parts.map(part =><li key={part.id}>{part.name} {part.exercises}</li> )}
    </ul>
    </div>
  )
}



export default Part;
