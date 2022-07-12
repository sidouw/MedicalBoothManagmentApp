import React,{useMemo} from "react"
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider,createTheme } from '@mui/material/styles';

import {selectTheme} from '../Store/Reducers/themeReducer'
import {useSelector} from 'react-redux'

import customTheme from '../Utils/Theme'
import Header from "../Components/Header";
import PrivateRoute from "./PrivateRoute";
import PatientsPage from "../Pages/PatientsPage";
import ConsultationsPage from "../Pages/ConsultationsPage";
import AddConsultationPage from '../Pages/AddConsultationPage'
import PatientPage from '../Pages/PatientPage'
import SettingsPage from "../Pages/SettingsPage";
import LogInPage from "../Pages/LogInPage";
import ConsultationPage from "../Pages/ConsultationPage";
import AnalyticsPage from '../Pages/AnalyticsPage'

const AppRouter = () => {

  const ctheme = useSelector(selectTheme)

  const themex = useMemo(()=>{
    document.documentElement.style
    .setProperty('--light-color', ctheme.primary);

    return createTheme(customTheme,{
      palette: {
        primary: { main: ctheme.primary },
        secondary: { main: ctheme.secondary },
      },
      typography: {
        color : ctheme.secondary,
        h1:{
            color : ctheme.secondary,
        },
        h2:{
            color : ctheme.secondary,
        },
        h3:{
            color : ctheme.secondary
        },
        h4:{
            color : ctheme.secondary
        },
        h5:{
            color : ctheme.secondary
        },
        h6:{
            color : ctheme.secondary,
        }
        },
    })
  },[ctheme]
  )

      return (
      <Router>
      <>
        <div className="container">
        <ThemeProvider theme={themex}>
          <Header/>
    
          <Routes>
            
            <Route path="/" element={ <LogInPage/> } />

            <Route path="/Analytics" element={
              <PrivateRoute>
                <AnalyticsPage/>
              </PrivateRoute>
                
              } />

            <Route path="/Patients" element={
              <PrivateRoute>
                <PatientsPage/>
              </PrivateRoute>
                
              } />

            <Route path="/Patients/:id" element={
              <PrivateRoute>
                <PatientPage/>
              </PrivateRoute>
                
              } />

            <Route path="/Visits" element={
              <PrivateRoute>
                <ConsultationsPage/>
              </PrivateRoute>
                
              } />

            <Route path="/Visits/add" element={
              <PrivateRoute>
                <AddConsultationPage/>
              </PrivateRoute>
                
              } />

            <Route path="/Visits/:id" element={
              <PrivateRoute>
                <ConsultationPage/>
              </PrivateRoute>
                
              } />

            <Route path="/Settings" element={
              <PrivateRoute>
                <SettingsPage/>
              </PrivateRoute>
                
              } />

          </Routes>
        </ThemeProvider>
        </div>
        </>
      </Router>)
   
  }

export default AppRouter;
