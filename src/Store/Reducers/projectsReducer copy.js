import { createSlice } from '@reduxjs/toolkit';
const {ipcRenderer} = window.require('electron') 



export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    value: [...data],
  },
  reducers: {
    addProject: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = [...state.value,action.payload];
    },
    deleteProject: (state, action) => {
        state.value = state.value.filter((project)=>project.id!==action.payload)
    },
    editProject: (state, action) => {
        state.value = state.value.filter((project)=>project.id!==action.payload.id)
        state.value = [...state.value,action.payload];
    },
  },
});

export const { addProject, deleteProject, editProject } = projectsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addprojectAsync = project => dispatch => {
  setTimeout(() => {
    dispatch(addProject({...project,id:Math.floor(Math.random() * 10)}));
  }, 500);
};
export const deleteprojectAsync = project => dispatch => {
  setTimeout(() => {
    dispatch(deleteProject(project));
  }, 500);
};
export const editprojectAsync = project => dispatch => {
  setTimeout(() => {
    dispatch(editProject(project));
  }, 500);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectprojecs = state => state.projects.value;

export const selectProjectID =id =>state=>{

  return state.projects.value.find((pj)=>(pj.id===id))
}
export default projectsSlice.reducer;
