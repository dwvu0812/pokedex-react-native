import { createSlice } from '@reduxjs/toolkit'

export const pokemonDetail = createSlice({
  name: 'pokemonDetail',
  initialState: {
    detail: {},
    loading: false,
    error: null,
  },
  reducers: {
    getDetail: (state, action) => {
      state.loading = true;
    },
    getDetailSuccess: (state, action) => {
      state.detail = action.payload;
      state.loading = false;
    },
    getDetailFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
})

// console.log(counterSlice)

// Action creators are generated for each case reducer function
export const { getDetail, getDetailSuccess, getDetailFailure } = pokemonDetail.actions

export default pokemonDetail.reducer