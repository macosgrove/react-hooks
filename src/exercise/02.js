// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(retrieveName)
  const [count, setCount] = React.useState(0)

  function retrieveName() {
    console.log('retrieving name')
    return window.localStorage.getItem('name') ?? initialName
  }

  React.useEffect(() => {
    console.log('setting name')
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="MAC" />
}

export default App
