// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

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
      throw new Error(state.error.message)
    default:
      throw new Error(`Invalid status ${state.status}`)
  }

  function IdleMessage() {
    return <div>Enter the name of a Pokemon to begin</div>
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
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
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setPokemonName('')
          }}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
