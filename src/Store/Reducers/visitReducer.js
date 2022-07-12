import { createSlice } from '@reduxjs/toolkit';
const {ipcRenderer} = window.require('electron') 


export const visitsSlice = createSlice({
  name: 'visits',
  initialState: {
    active : '',
    value: [],
  },

  reducers: {
    
    setVisits: (state, action) => {
      state.value = [...action.payload];
    },
    addVisit: (state, action) => {

      state.value = [...state.value,action.payload];
    },
    
    deleteVisit: (state, action) => {
        state.value = state.value.filter((visit)=>visit._id!==action.payload)
    },

    editVisit: (state, action) => {
        state.value = state.value.filter((visit)=>visit._id!==action.payload._id)
        state.value = [...state.value,action.payload];
    },

    setActiveVisit: (state, action) => {
        state.active = action.payload
    },
  },

});

export const {setVisits,addVisit, deleteVisit, editVisit,setActiveVisit } = visitsSlice.actions;


export const addVisitAsync = visit => dispatch => {
  
    ipcRenderer.invoke('addVisit',visit).then((vis)=>{
        dispatch(addVisit({...vis}));
    })
};

export const deleteVisitAsync = visitID => dispatch => {
  ipcRenderer.invoke('deleteVisit',visitID).then((pat)=>{
    dispatch(deleteVisit(visitID))
  })
};

export const editVisitAsync = visit => dispatch => {
  ipcRenderer.invoke('editVisit',visit).then((pat)=>{
    dispatch(editVisit(visit));
  })
};

export const selectVisits = state => state.visits.value  
                                      .map((res)=>({_id:res._id,
                                        date:res.date,
                                        patient:res.patient,
                                        motif:res.motif,
                                        diagnostic:res.diagnostic,
                                        medcin:res.medcin,
                                        tarif:res.tarif
                                      }));
export const selectActiveVisit = state => state.visits.active;
export const selectVisitID =id =>state=>{
  return state.visits.value.find((pt)=>(pt._id===id))
}
export default visitsSlice.reducer;
