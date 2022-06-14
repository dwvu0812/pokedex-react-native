import { configureStore } from '@reduxjs/toolkit'
import pokemons from './pokemonSlice'
import pokemonDetail from './pokemonDetailSlice'
import filter from './filterSlice'

export default configureStore({
  reducer: {
    pokemons: pokemons,
    pokemonDetail: pokemonDetail,
    filter: filter,
  }
})