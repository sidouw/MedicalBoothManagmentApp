import { createSlice } from '@reduxjs/toolkit';
const {ipcRenderer} = window.require('electron') 
export const insitusSlice = createSlice({
  name: 'insitus',
  initialState: {
    value: [],
  },

  reducers: {
    
    setInsitus: (state, action) => {
      state.value = [...action.payload];
    },
    addInsitu: (state, action) => {
      state.value = [...state.value,action.payload];
    },
    
    deleteInsitu: (state, action) => {
        state.value = state.value.filter((insitu)=>insitu._id!==action.payload)
    },
  },

});

export const {setInsitus,addInsitu, deleteInsitu} = insitusSlice.actions;


export const addInsituAsync = insitu => dispatch => {
  
    ipcRenderer.invoke('addInsitu',insitu).then((pat)=>{
        dispatch(addInsitu({...pat}));
    })
};

export const deleteInsituAsync = insituID => dispatch => {
  ipcRenderer.invoke('deleteInsitu',insituID).then((pat)=>{
    dispatch(deleteInsitu(insituID))
  })
};


export const selectInsitus = state => state.insitus.value;

export default insitusSlice.reducer;
