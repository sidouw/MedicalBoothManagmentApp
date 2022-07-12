import React,{useState} from 'react'


import {Typography,Grid,Button} from '@mui/material'

import {setTheme,selectTheme} from '../Store/Reducers/themeReducer'
import {useDispatch,useSelector} from 'react-redux'
import useDebounce from '../Utils/useDeboune'




const ColorSettings = ()=>{

  const theme = useSelector(selectTheme)
  const [th,setTh] = useState({...theme})

  const disptch = useDispatch()

  const onThemeChanged = (e)=>{
    const t = {}
    t[e?.target?.name]=e?.target?.value
    setTh(t)
    
  }

useDebounce(()=>disptch(setTheme(th)),250,[th])

const reset = ()=>{
  localStorage.clear()
  setTh({
    primary: '#E74C3C',
    secondary: '#444444',
  })
}

  return (
    <Grid style={{marginTop : '10px' }} container >

          <ColorSetting text = 'Couleur Premier ' name='primary' value={theme.primary} onValueChanged= {onThemeChanged}   />

          <ColorSetting text = 'Couleur secondaire' name='secondary'  value={theme.secondary} onValueChanged= {onThemeChanged} />
          <Button onClick={reset} variant='contained' >Réinitialiser</Button>

    </Grid>
  )
}




const ColorSetting = ({text,value,onValueChanged,name})=>{
    
    return <Grid  container spacing={3} flexDirection='row'  item>
  
    <Grid item >
      <Typography variant='h5' > {text} </Typography>
    </Grid >
  
    <Grid item>
      <input type='color' value={value} name={name} onChange = {onValueChanged} style={{width:'40px',height:'40px',padding:'0',border:'none'}}  />
    </Grid>
  
  </Grid>
  
  }

  export default ColorSettings