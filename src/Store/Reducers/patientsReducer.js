import { createSlice } from '@reduxjs/toolkit';
const {ipcRenderer} = window.require('electron') 

export const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    active : '',
    value: [],
  },

  reducers: {
    
    setPatients: (state, action) => {
      state.value = [...action.payload];
    },
    addPatient: (state, action) => {

      state.value = [...state.value,action.payload];
    },
    
    deletePatient: (state, action) => {
        state.value = state.value.filter((patient)=>patient._id!==action.payload)
    },

    editPatient: (state, action) => {
        state.value = state.value.filter((patient)=>patient._id!==action.payload._id)
        state.value = [...state.value,action.payload];
    },

    setActivePatient: (state, action) => {
        state.active = action.payload
    },
  },

});

export const {setPatients,addPatient, deletePatient, editPatient,setActivePatient } = patientsSlice.actions;


export const addPatientAsync = patient => dispatch => {
  
    ipcRenderer.invoke('addPatient',patient).then((pat)=>{
        dispatch(addPatient({...pat}));
    })
};

export const deletePatientAsync = patientID => dispatch => {
  ipcRenderer.invoke('deletePatient',patientID).then((pat)=>{
    dispatch(deletePatient(patientID))
  })
};

export const editPatientAsync = patient => dispatch => {
  ipcRenderer.invoke('editPatient',patient).then((pat)=>{
    dispatch(editPatient(patient));
  })
};

export const selectPatients = state => state.patients.value;
export const selectActivePatient = state => state.patients.active;
export const selectPatientID =id =>state=>{
  return state.patients.value.find((pt)=>(pt._id===id))
}
export default patientsSlice.reducer;
