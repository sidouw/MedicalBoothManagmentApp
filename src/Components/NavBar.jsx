import React from 'react';
import {Link,useLocation} from "react-router-dom"



import {People,Tour,Dashboard,Settings,Logout} from '@mui/icons-material'
import {useTheme} from '@mui/material/styles'
import {Typography,Divider} from '@mui/material'

const NavBar = ()=>{
    const theme = useTheme()
   return ( 
            <nav  className="navbar" style={{background:theme.palette.primary.main}} >

                <div className="nav-container">
                    <Typography variant='h1' style={{color:'white'}} >H</Typography>

                    <ul className="nav-menu">
                        <Divider sx = {{margin : '5px 0' , color : 'white',background :'white',width : '95%'}} />

                        
                        <RouterLink to = "/Patients" Icon={People} text = "Patients"/>
                        <RouterLink to = "/Visits" Icon={Tour} text = "Consultations"/>
                        <RouterLink to = "/Analytics" Icon={Dashboard} text = "Analytique"/>
                        <Divider sx = {{margin : '5px 0' , color : 'white',background :'white',width : '95%'}} />

                        <RouterLink to = "/Settings" Icon={Settings} text = "Paramètre"/>
                        <RouterLink to = "/" Icon={Logout} text = "Logout"/>
                    </ul>

                </div>

            </nav >
    )
}
export default NavBar


const RouterLink = ({to,Icon,text})=>{
    const location = useLocation()
    return (
            <li className={location.pathname===to ? "nav-item active" :"nav-item" }>
                    <Link 
                    to = {to}
                    className={location.pathname===to ? "nav-links activelink" :"nav-links" } 
                    >
                        <Icon style = {{ verticalAlign: 'middle',fontSize : '1.8rem',marginRight : '5px'}} />
                        {text}
                    </Link>
            </li>
    )
}