import React, {useState,useEffect} from 'react';


import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import moment from 'moment'

import {selectPatients,deletePatientAsync,setActivePatient,setPatients} from '../Store/Reducers/patientsReducer'

import PatientModel from '../Components/PatientModal'

import {Container,Button,} from '@mui/material'
import MaterialTable,{MTableAction} from "@material-table/core";
import tableIcons from "../Utils/MaterialTableIcons";





  
  const columns = [
    { title: "Nom", field: "nom",defaultSort : 'desc' },
    { title: "Prénom", field: "prenom" },
    { title: "Séxe", field: "sexe"},
    { title: "Numéro", field: "numero", type: "numeric" },
    { title: "Age", field: "age", type: "numeric" },
  ]

const PatientsPage = ()=>{
    const navigate = useNavigate();
    const data = useSelector(selectPatients)
    const dispatch = useDispatch()
    const [tableData,setTableData] = useState([])
    const [open,setOpen] = useState(false)

    useEffect(()=>{

      setTableData(data.map((d)=>{
        return {...d,age:moment().diff(moment(d.birthDate),'year')}
      }))
      console.log(tableData);
    },[data])
    return (

      <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto',alignSelf:'center'}}>

          <MaterialTable 
              title="Patients" 
              icons={tableIcons}  
              columns={columns} 
              data={tableData} 
              editable={{

                onRowDelete: (oldData) => {
                  return new Promise((resolve, reject) => {
                      console.log(oldData);
                      dispatch(deletePatientAsync(oldData._id))
                      resolve();
                  });
                },
              }}
              localization={{
                body:{
                  emptyDataSourceMessage :'Aucun patient à afficher ',
                  editRow : {
                    deleteText : 'Effacé ce patient ?',
                  }
                },
                grouping:{
                  placeholder: 'Glisser les en-têtes ici pour regrouper par',
                  groupedBy:'Regrouper par'
                }
              }}
              actions={[
                  {
                    icon: tableIcons.PermContactCalendarOutlined,
                    tooltip: "Page du patient",
                    onClick: (event, rowData) =>{dispatch(setActivePatient(rowData._id)) ;navigate("/Patients/"+rowData._id)},
                  },
                  {
                    icon: tableIcons.Edit,
                    tooltip: "Modifier le patient",
                    onClick: (event, rowData) =>{ dispatch(setActivePatient(rowData._id));setOpen(true)} ,
                  },
                  {
                    icon: tableIcons.Add,
                    tooltip: "Ajouter Patient",
                    isFreeAction: true,
                    onClick: (event) =>{ dispatch(setActivePatient('+'));setOpen(true)},
                  },
                ]}

                components={{
                  Action: props => {
                    if(props.action.isFreeAction) {
                      
                      return (
                        <Button
                          onClick={(event) => props.action.onClick(event, props.data)}
                          color="primary"
                          variant="contained"
                          endIcon={<props.action.icon/>}
                          style={{marginLeft :'20px',fontWeight : '600'}}
                          disableElevation
                          // size="small"
                        >
                          Ajouter Un Patien
                        </Button>
                      );
                    }
                    return <MTableAction {...props} />;
                  },
                }}
              options={{
                  actionsColumnIndex: -1,
                  search : true,
                  paging : true,
                  pageSize : 10,
                  thirdSortClick : false,
                  maxBodyHeight :'70vh',
                  minBodyHeight : '70vh',
                  grouping: true,
                  headerStyle: {
                      color : '#444',
                      fontWeight :'bold',
                      fontSize :'1.3rem',
                      position : 'sticky',
                      boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.1)',
                    },
              }}
          />

          <PatientModel open = {open} setOpen={setOpen}/>
      </Container>
    )
}
export default PatientsPage