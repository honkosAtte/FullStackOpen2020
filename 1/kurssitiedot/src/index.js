import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }

  const Content = ({parts}) => {
    return(
    <div>
      <Part item={parts[0]}/>
      <Part item={parts[1]}/>
      <Part item={parts[2]}/>
    </div>
    )
  }

  const Part = ({item}) => {
    console.log(item)
    return (
    <p>{item.name} {item.exercises}</p>
    )
  }

  const Total = ({parts}) => {
    return (
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

