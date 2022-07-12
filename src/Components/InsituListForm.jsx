import React  from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';

import {selectInsitus} from '../Store/Reducers/insitusReducer'
import {useSelector} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: "5px 5px",
      width :'270px',
    },
    
  },
  title:{
    marginLeft : 'auto',
    background : 'rgb(50,50,50)',
    width : '100%'
  },
  button: {
    margin: '10px',
  },
  box : {
    margin: '10px',
    display : 'flex',
    position : 'relative'
  }
}))

export default function App({inputFields, setInputFields}) {
 
  const classes = useStyles()
  const insit = useSelector(selectInsitus)

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        
        if(event.target.name === 'insitu'){
          i.tarif = insit.find(element => element.insitu===event.target.value).tarif
        }
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    if (inputFields[inputFields.length - 1].insitu ===' ')
      return
    setInputFields([...inputFields, {id:uuidv4(), insitu: ' ', tarif: 0 }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
    <div className={classes.root}>
      { 
          inputFields.map((inputField,index) => (

              <div className={classes.box} key={index} >
                <TextField
                  select
                  name="insitu"
                  label="Insitu"
                  size ="small"
                  variant="standard"
                  value = {inputField.insitu}
                  onChange={event => handleChangeInput(inputField.id, event)}
                >
                    {
                      insit.map((ins,index)=>(
                        <MenuItem key = {index} value={ins.insitu}>{ins.insitu}</MenuItem>
                      ))
                    }
                </TextField>

                  <TextField
                    name="tarif"
                    label="Tarif"
                    variant="standard"
                    size="small"
                    type = 'number'
                    InputProps={{
                      endAdornment: <InputAdornment >DA</InputAdornment>,
                    }}
                    value={inputField.tarif}
                    onChange={event => handleChangeInput(inputField.id, event)}
                  />

                <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={handleAddFields}
                >
                  <AddIcon />
                </IconButton>
              </div>
        )) 
      }
    </div>
  
  );

}

