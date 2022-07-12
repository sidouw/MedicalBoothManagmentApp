import React  from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: "0px 5px",
      width :'270px'
    },
  },
  button: {
    margin:'10px',
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
    setInputFields([...inputFields, {id:uuidv4(), antecedent: '', therapeutique: '' }])
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
              <div key={index} >
              
                <TextField
                  name="antecedent"
                  label="Antécédent"
                  variant="standard"
                  size="small"
                  value={inputField.antecedent}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />

                <TextField
                  name="therapeutique"
                  label="Thérapeutique"
                  variant="standard"
                  size="small"
                  value={inputField.therapeutique}
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

