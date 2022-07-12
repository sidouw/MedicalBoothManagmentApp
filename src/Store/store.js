import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './Reducers/patientsReducer'
import visitsReducer from './Reducers/visitReducer'
import userReducer from './Reducers/userReducer';
import insitusReducer from './Reducers/insitusReducer';
import themeReducer from './Reducers/themeReducer';
export default configureStore({
  reducer: {
    patients: patientsReducer,
    visits: visitsReducer,
    user: userReducer,
    insitus: insitusReducer,
    theme: themeReducer,
  },
});
