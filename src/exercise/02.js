// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialValue) {
  const [value, setValue] = React.useState(retrieveValue)
  function retrieveValue() {
    console.log(`retrieving ${key}`)
    return window.localStorage.getItem(key) ?? initialValue
  }

  React.useEffect(() => {
    console.log(`setting ${key}`)
    window.localStorage.setItem(key, value)
  }, [key, value])
  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [count, setCount] = React.useState(0)
  const [name, setName] = useLocalStorageState('name', initialName)

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
