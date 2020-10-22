import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
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

  const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }

  const Content = ({list}) => {
    return(
    <div>
      <Part item={list[0]}/>
      <Part item={list[1]}/>
      <Part item={list[2]}/>
    </div>
    )
  }

  const Part = ({item}) => {
    console.log(item)
    return (
    <p>{item.name} {item.exercises}</p>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.total}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content list={parts}/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

