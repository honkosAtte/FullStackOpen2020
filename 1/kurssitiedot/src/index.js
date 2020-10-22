import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Content = (props) => {
    console.log(props.list)
    return (<>
      {props.list.map((row) => (
      <p key={row.part}>{row.part} {row.exercises}</p>))}
      </>)
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.total}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content list={[
    {
      part: part1,
      exercises: exercises1
    },
    {
      part: part2,
      exercises: exercises2
    },   
    {
      part: part3,
      exercises: exercises3
    }
  ]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

