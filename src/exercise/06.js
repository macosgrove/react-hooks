// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle'})
  React.useEffect(() => {
    if (!pokemonName) return
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({status: 'resolved', pokemonData})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  switch (state.status) {
    case 'idle':
      return <IdleMessage />
    case 'pending':
      return <PokemonInfoFallback name={state.pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemonData} />
    case 'rejected':
      return <PokemonError />
    default:
      return <div>`Invalid status ${state.status}`</div>
  }

  function IdleMessage() {
    return <div>Enter the name of a Pokemon to begin</div>
  }

  function PokemonError() {
    return (
      <div role="alert">
        There was an error:
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
