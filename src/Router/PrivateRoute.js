import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectLogedIn} from '../Store/Reducers/userReducer'
import NavBar from "../Components/NavBar";


function PrivateRoute({ children }) {
    const logedIn = useSelector(selectLogedIn);
    return logedIn ?
                 <> <NavBar/> {children} </> 
                 
                 : 
                 <Navigate to="/" />;
  }

export default PrivateRoute