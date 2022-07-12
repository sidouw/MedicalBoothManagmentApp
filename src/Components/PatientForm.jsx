import React, {useState,useEffect} from 'react';


import { useSelector, useDispatch } from 'react-redux';


import {TextField,Grid,MenuItem,Button} from '@mui/material';
import {Save as SaveIcon ,Delete as DeleteIcon} from '@mui/icons-material';


import AntecedentTable from './AnticedentTable'
import {addPatientAsync,editPatientAsync,selectActivePatient,setActivePatient,selectPatientID} from '../Store/Reducers/patientsReducer';



export default function PatientForm({setOpen}) {

  const dispatch = useDispatch()
  const active = useSelector(selectActivePatient)
  const patientS = useSelector(selectPatientID(active))


  const [antecedents, setAntecedent] = useState([])
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [number, setNumber] = useState(0)
  const [gender, setGender] = useState('')




  useEffect(()=>{

      if(active!=='+' && active!==''){  
          setName(patientS.prenom)
          setLastName(patientS.nom)
          setBirthDate(patientS.birthDate)
          setNumber(patientS.numero)
          setGender(patientS.sexe)
          setAntecedent(patientS.antecedents.length ===0 ? [] : patientS.antecedents.map(a => {return {...a}}))
        }

  },[])

  const handleSubmit = e=> {
    e.preventDefault()
    
    if(active === '+'){
        const patient = {
          prenom: name, 
          nom: lastName, 
          birthDate,
          numero:number,
          sexe :gender,
          antecedents
        }
        dispatch(addPatientAsync(patient))
      }else if (active!==''){
        const patient = {
          _id:patientS._id,
          prenom: name, 
          nom: lastName, 
          birthDate,
          numero: number,
          sexe :gender,
          antecedents:[...antecedents]
        }
        dispatch(editPatientAsync(patient))
      }

    dispatch(setActivePatient(''))
    setOpen(false)

  }

  const handleCancel = ()=>{
    dispatch(setActivePatient(''))
    setOpen(false)
  }

  return (
    <form onSubmit ={handleSubmit} style= {{minWidth: '700px',maxWidth: '700px'}} >

          <h1 style = {{margin:'0 0 5px 0',padding:'10px 0 0 0',textAlign : 'center',opacity : '.65'}}>{active ==='+'? 'Ajouter un Patient' : 'Modifier le Patient'}</h1>

        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            style = {{height:"100%",padding:'14px'}}
          >
            <Grid container item  justifyContent = "space-between" >

              <TextField 
              sx = {{width : '49%',}}
              required
              value = {lastName}
              onChange = {e=>setLastName(e.currentTarget.value)}
              name="nom"
              label="Nom"
              variant="outlined"
              size ="small"
              helperText="Enter Nom du patient"
              />

              <TextField
              sx = {{width : '49%',}}
              required
              value = {name}
              onChange = {e=>setName(e.currentTarget.value)}
              name="prenom"
              label="Prénom"
              variant="outlined"
              size ="small"
              helperText="Enter Prénom du patient"
              />

            </Grid>
            <Grid container item  justifyContent = "space-between" >

              <TextField
              sx = {{margin : '0 2px',width : '30%'}}
              value = {number}
              onChange = {e=>setNumber(e.currentTarget.value)}
              id="filled-number"
              label="Numéro"
              type="number"
              size ="small"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              helperText="Enter numero du patient"
              />
              <TextField
                sx = {{margin : '0 2px',width : '30%'}}
                required
                value = {birthDate}
                onChange = {e=>setBirthDate(e.currentTarget.value)}
                id="filled-number"
                label="Date de naissance"
                type="date"
                size ="small"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                helperText="Enter la date de naissance du patient"
              />

              <TextField
                sx = {{margin : '0 2px',width : '30%'}}
                required
                id="standard-select-currency"
                select
                label="Séxe"
                size ="small"
                helperText="Enter le séxe du patient"
                value = {gender}
                onChange = {e=>setGender(e.target.value)}
              >
                <MenuItem value='M'>M</MenuItem>
                <MenuItem value='F'>F</MenuItem>
              </TextField>

            </Grid>

            <Grid item >
              <AntecedentTable antecedents = {antecedents} setAntecedent = {setAntecedent} />
            </Grid>
            
            <Grid item container  justifyContent = "flex-start" >
              <Button
                variant="contained" 
                color="primary"
                size ="small"
                type="submit" 
                startIcon={<SaveIcon />}
                style = {{margin:'0 10px'}}
                >
                {active ==='+'? 'Ajouter' : 'Modifier'}
              </Button>
              <Button 
                variant="contained" 
                color="secondary"
                size ="small"
                onClick= {handleCancel}
                startIcon={<DeleteIcon />}>
                Annuler
              </Button>
            </Grid>

        </Grid>
    </form>
  );
}
