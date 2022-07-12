import React from 'react';

const {ipcRenderer} = window.require('electron')

import {useTheme} from '@mui/material/styles'

const Header = ()=>{

    const theme = useTheme()
const minimaze = ()=>{
    ipcRenderer.send("min")
}
const maximaze = ()=>{
    ipcRenderer.send("max")
}
const close = ()=>{
    ipcRenderer.send("close")
}

return (

        <header className = "header" style={{background:theme.palette.primary.main}}>
            <span onClick = {()=>minimaze()} id = "minimaze" className = "header-items">-</span>
            <span onClick = {()=>maximaze()} id = "maximaze" className = "header-items">M</span>
            <span onClick = {()=>close()} id = "close" className = "header-items">X</span>
        </header>
    )
}
export default Header