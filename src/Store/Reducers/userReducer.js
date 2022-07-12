import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    logedIn : false,
    user:'user',
  },

  reducers: {
    
    setUser: (state, action) => {
      state.user =action.payload;
    },
    setLogedIn: (state, action) => {
      state.logedIn =action.payload;
    },
  
  },

});

export const {setUser,setLogedIn} = userSlice.actions;


export const selectUser = state => state.user.user;
export const selectLogedIn = state => state.user.logedIn;

export default userSlice.reducer;
