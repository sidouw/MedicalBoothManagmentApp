import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector } from 'react-redux';
import moment from 'moment';

import {addVisitAsync} from '../Store/Reducers/visitReducer'
import {selectActivePatient,setActivePatient} from '../Store/Reducers/patientsReducer'
import {selectUser} from '../Store/Reducers/userReducer'


import InsitusTable from '../Components/InsituTable'
import OrdonnenceTable from '../Components/OrdonnenceTable'

import {Save as SaveIcon,Delete as DeleteIcon} from '@mui/icons-material';
import {Container,Typography,TextField,InputAdornment,Grid,Button} from '@mui/material'

const mb = '20px'

const AddConsultationPage = ()=>{
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const activePat = useSelector(selectActivePatient)
    const user = useSelector(selectUser)

    const [motif, setMotif] = useState('')
    const [histoire, setHistoire] = useState('')
    const [clinique, setClinique] = useState('')
    const [biologie, setBiologie] = useState('')
    const [date, setDate] = useState(moment().format('yyyy-MM-DD'))
    const [radiologie, setRadiologie] = useState('')
    const [autre, setAutre] = useState('')
    const [conclusion, setConclusion] = useState('')
    const [diagnostic, setDiagnostic] = useState('')
    const [tarif, setTarif] = useState(0)
    const [insituList, setInsituList] = useState([])
    const [ordonnenceList, setOrdonnenceList] = useState([])
  

  useEffect(()=>{
    
    return (()=>{
      dispatch(setActivePatient(''))
    })
  },[])

  const handleSubmit = e=> {
    e.preventDefault()
    const vis = {
      medcin : user,
      patient:activePat ,
      motif,
      histoire,
      clinique,
      biologie,
      radiologie,
      autre,
      tarif,
      conclusion,
      diagnostic,
      date,
      ordonnence : (ordonnenceList),
      insitu : (insituList),
    }

    dispatch(addVisitAsync(vis))
    dispatch(setActivePatient(''))
    navigate(-1)
  }

  const handleCancel = ()=>{
    dispatch(setActivePatient(''))
    navigate(-1)
  }


    return (
        <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto'}}>
            <Typography variant='h1' >Ajouter Consultation</Typography>
            <form onSubmit ={handleSubmit}>
               {/* Information */}
                <Container maxWidth = 'xl'>
                    <Typography mb={mb} variant='h2' >Information</Typography>
                    <TextField
                        required
                        sx = {{marginBottom : mb}}
                        value = {motif}
                        onChange = {e=>setMotif(e.currentTarget.value)}
                        name="motif"
                        label="Motif de Consultation"
                        variant="outlined"
                        size ="small"
                        fullWidth
                        />

                        <TextField
                        sx = {{marginBottom : mb}}
                        value = {histoire}
                        onChange = {e=>setHistoire(e.currentTarget.value)}
                        name="histoire"
                        label="Histoire de la maladie"
                        variant="outlined"
                        size ="small"
                        multiline
                        minRows = {8}
                        maxRows = {8}
                        fullWidth
                        />
                </Container>

                <Container maxWidth = 'xl'>
                    <Typography mb={mb} variant='h2' >Examen</Typography>
                    <TextField
                        sx = {{marginBottom : mb}}

                        value = {clinique}
                        onChange = {e=>setClinique(e.currentTarget.value)}
                        name="clinique"
                        label="Cinique"
                        variant="outlined"
                        size ="small"
                        multiline
                        minRows = {8}
                        maxRows = {8}
                        fullWidth
                        />
                        <TextField
                        sx = {{marginBottom : mb}}

                        value = {biologie}
                        onChange = {e=>setBiologie(e.currentTarget.value)}
                        name="biologie"
                        label="Biologie"
                        variant="outlined"
                        size ="small"
                        multiline
                        minRows = {8}
                        maxRows = {8}
                        fullWidth
                        />
                        <TextField
                        sx = {{marginBottom : mb}}
                        value = {radiologie}
                        onChange = {e=>setRadiologie(e.currentTarget.value)}
                        name="radiologie"
                        label="Radiologie"
                        variant="outlined"
                        size ="small"
                        multiline
                        minRows = {8}
                        maxRows = {8}
                        fullWidth
                        />
                        <TextField
                        sx = {{marginBottom : mb}}
                        value = {conclusion}
                        onChange = {e=>setConclusion(e.currentTarget.value)}
                        name="conclusion"
                        label="Conclusion"
                        variant="outlined"
                        size ="small"
                        multiline
                        minRows = {8}
                        maxRows = {8}
                        fullWidth
                        />
                        <TextField
                        sx = {{marginBottom : mb}}
                        value = {diagnostic}
                        onChange = {e=>setDiagnostic(e.currentTarget.value)}
                        name="diagnostic"
                        label="Diagnostique"
                        variant="outlined"
                        size ="small"
                        fullWidth
                        />
                </Container>

                <Container maxWidth = 'xl'>
                    <Typography mb={mb} variant='h2' >Conduit a tenir</Typography>
                    <InsitusTable insitus={insituList} setInsitus = {setInsituList} />
                    <TextField
                    sx = {{marginBottom : mb,marginTop : mb}}
                    value = {autre}
                    onChange = {e=>setAutre(e.currentTarget.value)}
                    name="autre"
                    label="Autre"
                    variant="outlined"
                    size ="small"
                    multiline
                    minRows = {8}
                    maxRows = {8}
                    fullWidth
                    />
                </Container>
               
                <Container maxWidth = 'xl'>
                    <Typography mb={mb} variant='h2'>Ordonnence</Typography>
                    <OrdonnenceTable setMedic={setOrdonnenceList} medic = {ordonnenceList} />
                    
                </Container>

                <Container sx = {{marginBottom : mb,marginTop : mb}} maxWidth = 'xl'>

                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            spacing={3}
                            alignItems="center"
                        >
                            
                            <Grid item>
                                <Button
                                    variant="contained" 
                                    color="primary"
                                    size ="large"
                                    type="submit" 
                                    startIcon={<SaveIcon />}>
                                    Ajouter
                                    </Button>
                            </Grid>

                            <Grid item>
                            <Button 
                                variant="contained" 
                                color="secondary"
                                size ="large"
                                onClick= {handleCancel}
                                startIcon={<DeleteIcon />}>
                                    Annuler
                                </Button>
                            </Grid>

                            <Grid  item>
                                <TextField
                                    name="tarif"
                                    label="Tarif"
                                    variant="standard"
                                    sx = {{marginBottom : mb,marginTop : mb}}
                                    size="small"
                                    type = 'number'
                                    value={tarif}
                                    InputProps={{
                                        endAdornment: <InputAdornment >DA</InputAdornment>,
                                    }}
                                    onChange = {e=>setTarif(e.currentTarget.value)}
                                    />
                            </Grid>

                            <Grid  item>
                            <TextField
                                // sx = {{marginBottom : mb,marginTop : mb}}
                                required
                                defaultValue={date}
                                value = {date}
                                //  
                                onChange = {e=>{setDate(e.currentTarget.value)}}
                                label="Date de Consultation"
                                type="date"
                                size ="small"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                variant="standard"
                                // helperText="Enter la date de naissance du patient"
                            />
                            </Grid>

                        </Grid>
                </Container>

            </form>
        </Container>
        
    )
}
export default AddConsultationPage