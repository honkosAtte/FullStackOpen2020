import React from 'react';
const Total = ({course}) => {

const callBackFn = (sum, part) => sum + part.exercises
const sum = course.parts.reduce(callBackFn, 0)
  return (
    <div>

    <h2>total of {sum} exercises </h2>

    </div>
  )
}



export default Total;
