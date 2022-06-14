import {createSlice} from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: 'all',
  },
  reducers: {
    getFilterValue: (state, action) => {
    //   console.log(action.payload)
      state.filter = action.payload;
    //   console.log(state.loading)
    },
    
}});

export const {getFilterValue} = filterSlice.actions;

export default filterSlice.reducer;
