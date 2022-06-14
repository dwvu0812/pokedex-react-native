import {createSlice} from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
  },
  reducers: {
    getPokemons: (state, action) => {
      // console.log(1)
      state.loading = true;
      // console.log(state.loading)
    },
    getPokemonsSuccess: (state, action) => {
      state.pokemons = action.payload;
      state.loading = false;
      // console.log(2)
    },
    getPokemonsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// console.log(counterSlice)

// Action creators are generated for each case reducer function
export const {getPokemons, getPokemonsSuccess, getPokemonsFailure} =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
