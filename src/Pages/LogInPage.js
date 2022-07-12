
import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'


import {setUser,setLogedIn} from '../Store/Reducers/userReducer'
import {setVisits} from '../Store/Reducers/visitReducer'
import {setPatients} from '../Store/Reducers/patientsReducer'
import {setInsitus} from '../Store/Reducers/insitusReducer'
import {setTheme} from '../Store/Reducers/themeReducer'


import {AccountCircle,Lock,Login} from '@mui/icons-material';
import {Grid,Button,TextField,InputAdornment,Typography } from '@mui/material';
const {ipcRenderer} = window.require('electron') 



const styles = {
  form : {
    height:"400px",
    width:"400px",
    display : ' flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignContent :' center',
    background : 'white',
    boxShadow: '0px 0px 10px 1px rgba(68,68,68,.5)',
    zIndex : 20,
    borderRadius : '3px'
  },
  grid : {
    height : '80%',
    padding:'30px 15px 20px 15px ',
  },
}
export default function LogInPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(false)

  useEffect(()=>{
    const theme = localStorage.getItem('theme')
    console.log(theme);
    theme && dispatch(setTheme(JSON.parse(theme)))

  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    ipcRenderer.invoke('login',{user,pass:password}).then((users)=>{
      if (users.length ===0){
        setError(true)
        return 
      }
      dispatch(setLogedIn(true))
      dispatch(setUser(users[0].user))
      setError(false)

      ipcRenderer.invoke('getPatientsData').then((pat)=>{
        ipcRenderer.invoke('getVisitsData').then((vis)=>{
          dispatch(setPatients(pat))
          dispatch(setVisits(vis))
          ipcRenderer.invoke('getInsitus').then((insits)=>{
            dispatch(setInsitus(insits))
            navigate("/Patients")
          })
        })
    })
      
    })
  }

  return (
    <div className = "loginPagecontent" >


        <form style={styles.form} onSubmit ={handleSubmit} >
          <Typography variant='h2' align='center' >Bienvenue</Typography>
          <Grid
          id = "pagegrid"
          style={styles.grid}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          wrap = 'nowrap'
          >
            
            <TextField
            required
            sx = {{marginBottom : '30px'}}
            value = {user}
            onChange = {e=>setUserName(e.currentTarget.value)}
            name="user"
            label="Utilisateur"
            variant="outlined"
            size ="medium"
            error = {error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            fullWidth
            />

            <TextField
            value = {password}
            onChange = {e=>setPassword(e.currentTarget.value)}
            name="password"
            label="Mot de pass"
            variant="outlined"
            type="password"
            required
            autoComplete="current-password"
            size ="medium"
            error = {error}
            helperText={ error && "Utilisateur ou mot de passe erroné"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            fullWidth
            
            />
            <Button
              style={{marginTop : '70px'}}
              variant="contained" 
              color="primary"
              size ="large"
              startIcon = {<Login/>}
              type="submit">
              LogIn
            </Button>

          </Grid>
        </form>


    </div>
    )
}
