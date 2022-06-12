import { configureStore } from '@reduxjs/toolkit'
import pokemons from './pokemonSlice'
import pokemonDetail from './pokemonDetailSlice'

export default configureStore({
  reducer: {
    pokemons: pokemons,
    pokemonDetail: pokemonDetail,
  }
})