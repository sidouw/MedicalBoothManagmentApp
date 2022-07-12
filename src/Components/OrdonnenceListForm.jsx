import React  from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: "0px 5px",
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


  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    if (inputFields[inputFields.length - 1].medicament ==='')
      return
    setInputFields([...inputFields, {id:uuidv4(), medicament: '', dose: 1 }])
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
              <div className={classes.box}  key={index} >
                <TextField
                  name="medicament"
                  label="Médicament"
                  variant="standard"
                  size="small"
                  autoComplete='on'
                  value={inputField.medicament}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
                
                <TextField
                  name="dose"
                  label="Dose"
                  variant="standard"
                  size="small"
                  type = 'number'
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

