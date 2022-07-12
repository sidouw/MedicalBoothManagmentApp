import React, {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import InsituListForm from './InsituListForm'
import InputAdornment from '@mui/material/InputAdornment';
import OrdonnenceListForm from './OrdonnenceListForm'
import {useDispatch,useSelector } from 'react-redux';
import {addVisitAsync} from '../Store/Reducers/visitReducer'
import {selectActivePatient,setActivePatient} from '../Store/Reducers/patientsReducer'
import {selectUser} from '../Store/Reducers/userReducer'
import DividerMiddel from './DividerMiddle';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  grid : {
    height:"100%",
    padding:' 14px 14px 5px 14px ',
  },
  sectextfield : {
    margin : '0 2px',
    width : '30%'
  },
  historyGrid:{
    minHeight : '250px',
    maxHeight:'250px',
    overflowY :'scroll',
    border : 'solid 1px rgb(190,190,190)',
    borderRadius : '10px',
    padding : '5px 0',
  },
  buttons:{
    textTransform: 'none'
  }
}))

export default function PatientForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const activePat = useSelector(selectActivePatient)
  const user = useSelector(selectUser)
  const [insituList, setInsituList] = useState([{id:uuidv4(),insitu: '', tarif: 0 },])
  const [ordonnenceList, setOrdonnenceList] = useState([{id:uuidv4(),medicament: '', dose: 1 },])

  const [motif, setMotif] = useState('')
  const [histoire, setHistoire] = useState('')
  const [clinique, setClinique] = useState('')
  const [biologie, setBiologie] = useState('')
  const [radiologie, setRadiologie] = useState('')
  const [autre, setAutre] = useState('')
  const [conclusion, setConclusion] = useState('')
  const [tarif, setTarif] = useState(0)

  const classes = useStyles()

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
      date : moment().format('yyyy-MM-DD'),
      ordonnence : (ordonnenceList[0].medicament==='' ? [] : [...ordonnenceList]),
      insitu : (insituList[0].insitu==='' ? [] : [...insituList]),
    }
    console.log(ordonnenceList);
    console.log(insituList);
    console.log(vis);
    dispatch(addVisitAsync(vis))
    dispatch(setActivePatient(''))
    navigate(-1)
  }

  const handleCancel = ()=>{
    dispatch(setActivePatient(''))
    navigate(-1)
  }

  return (

    <form onSubmit ={handleSubmit} className={classes.root}>

          <h1 style = {{margin:'0 0 5px 0',padding:'10px 0 0 0',textAlign : 'center',opacity :'.7'}}>Ajouter une Consultation</h1>

          <Divider style= {{margin : '0 100px'}} ></Divider>

          <Grid
          id = "pagegrid"
          className={classes.grid}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          wrap = 'nowrap'
        >
          <Grid container item  justifyContent = "space-between" >


            <TextField
            required
            sx = {{marginBottom : '10px'}}
            value = {motif}
            onChange = {e=>setMotif(e.currentTarget.value)}
            name="motif"
            label="Motif de Consultation"
            variant="outlined"
            size ="small"
            fullWidth
            />

            <TextField

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

          </Grid>

          <DividerMiddel>
              Examen clinique
          </DividerMiddel>

          <Grid container item flexDirection="column"  justifyContent = "space-between" >

            <TextField
            sx = {{margin : '10px 0'}}

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
            sx = {{marginBottom : '10px'}}

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

          </Grid>
          
          <DividerMiddel>
            Conduite a tenir
          </DividerMiddel>
          
          <Grid item 
                className={classes.historyGrid}
                sx = {{margin : '10px 0'}}
                id = "pagegrid" >
            <InsituListForm inputFields ={insituList} setInputFields={setInsituList}/>
          </Grid>          

          <Grid item>
            <TextField
              sx = {{margin : '10px 0'}}
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
          </Grid>
          
          <Grid item>
            <TextField
              sx = {{margin : '10px 0'}}
              value = {conclusion}
              onChange = {e=>setConclusion(e.currentTarget.value)}
              name="conclusion"
              label="Conclusion"
              variant="outlined"
              size ="small"
              // multiline
              minRows = {8}
              maxRows = {8}
              fullWidth
            />
          </Grid>

          <DividerMiddel>
              Ordonnence
          </DividerMiddel>

          <Grid item 
                className={classes.historyGrid}
                sx = {{margin : '10px 0'}}
                id = "pagegrid" >
            <OrdonnenceListForm inputFields ={ordonnenceList} setInputFields={setOrdonnenceList}/>
          </Grid>

          <Grid item style={{marginBottom : '10px',padding : '6px'}}>
            <TextField
              name="tarif"
              label="Tarif"
              variant="standard"
              size="small"
              type = 'number'
              value={tarif}
              InputProps={{
                endAdornment: <InputAdornment >DA</InputAdornment>,
              }}
              onChange = {e=>setTarif(e.currentTarget.value)}
            />
          </Grid>

          <Grid  item container  justifyContent = "space-around" >
            <Button
              className={classes.buttons}
              variant="contained" 
              color="primary"
              size ="small"
              type="submit" 
              startIcon={<SaveIcon />}>
              Ajouter
            </Button>
            <Button 
              className={classes.buttons}
              variant="contained" 
              color="secondary"
              size ="large"
              onClick= {handleCancel}
              startIcon={<DeleteIcon />}>
              Annuler
            </Button>
          </Grid>

        </Grid>
    </form>
  );
}
