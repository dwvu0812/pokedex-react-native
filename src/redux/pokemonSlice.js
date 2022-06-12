import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
  },
  reducers: {
    getPokemons: (state, action) => {
      state.loading = true;
    },
    getPokemonsSuccess: (state, action) => {
      state.pokemons = action.payload;
      state.loading = false;
    },
    getPokemonsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
})

// console.log(counterSlice)

// Action creators are generated for each case reducer function
export const { getPokemons, getPokemonsSuccess, getPokemonsFailure } = pokemonSlice.actions

export default pokemonSlice.reducer