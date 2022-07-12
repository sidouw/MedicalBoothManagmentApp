import { createSlice } from '@reduxjs/toolkit';




export const themeSlice = createSlice({
  name: 'theme',
  initialState:{ 
    theme :{
    primary: '#E74C3C',
    secondary: '#444444',
  }},
  reducers: {
    setTheme: (state, action) => {
      state.theme = {...state.theme,...action.payload};
      localStorage.setItem('theme',JSON.stringify(state.theme))
    }
  },
});

export const { setTheme} = themeSlice.actions;


export const selectTheme = state => state.theme.theme;


export default themeSlice.reducer;
