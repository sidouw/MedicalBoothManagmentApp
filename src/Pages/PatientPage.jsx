import React,{useState,useEffect} from 'react';
import {  useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import {selectPatientID,setActivePatient} from '../Store/Reducers/patientsReducer';
import {deleteVisitAsync} from '../Store/Reducers/visitReducer'

import tableIcons from "../Utils/MaterialTableIcons";
import MaterialTable from "@material-table/core";
import {Person as PersonIcon,Phone as PhoneIcon,CalendarToday as CalendarTodayIcon,Wc as WcIcon,DataUsage as DataUsageIcon} from '@mui/icons-material';
import {Grid,Container,Typography} from '@mui/material';

const {ipcRenderer} = window.require('electron')

const columnsH = [
    { title: "Maladie", field: "maladie" },
    { title: "Therapeutique", field: "therapie" },
  ]

const columnsC = [
    { title: "Date", field: "date" },
    { title: "Motif", field: "motif" },
    { title: "Diagnostique", field: "diagnostic" },
    { title: "Médecin", field: "medcin" },
    { title: "Tarif", field: "tarif" },
  ]


const headersMT = 2

const pageHeaderVar = 'h1'






const PatientInfoPage = ()=>{

    
    const [dataC,setDataC] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const { id } = useParams();
    const patient = useSelector(selectPatientID(id))

    useEffect(()=>{
        ipcRenderer.invoke('getPatientVisits',id).then((visists)=>{
            setDataC([...visists])
          })
    },[])
    console.log(patient.antecedents);
    return (

        <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto'}} >

            <Typography variant={pageHeaderVar} mt={headersMT} mb ={4}  >Patient</Typography>

            <Container >
                
                <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid container justifyContent="center"  item spacing={3}>
                            <PatienInfo Icon={PersonIcon} title = 'Nom' data={patient.nom} />
                            <PatienInfo Icon={PersonIcon} title = 'Prénom' data={patient.prenom} />
                            <PatienInfo Icon={CalendarTodayIcon} title = 'Date de naissance' data={patient.birthDate} />
                        </Grid>
                        <Grid container justifyContent="center"  item spacing={3} >
                            <PatienInfo Icon={WcIcon} title = 'Séxe' data={patient.sexe} />
                            <PatienInfo Icon={PhoneIcon} title = 'Numéro' data={patient.numero} />
                            <PatienInfo Icon={CalendarTodayIcon} title = 'Derniere visite' data={dataC[0] ? dataC[0].date : ''} />
                        
                        </Grid>   
                            
                </Grid>
            </Container>
           
            <Container sx={{ marginTop: headersMT}}  >

                    <Typography variant='h3' mt={headersMT} >Consultations</Typography>
                    <MaterialTable 
                        title="" 
                        columns={columnsC} 
                        data={dataC} 
                        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
                        editable={{

                            onRowDelete: (oldData) => {
                              return new Promise((resolve, reject) => {
                                  dispatch(deleteVisitAsync(oldData._id))
                                  resolve();
                              });
                            },
                          }}
                        localization={{
                        body:{
                            emptyDataSourceMessage :'Aucun consultation à afficher ',
                            editRow : {
                                deleteText : 'Effacé cette consultation ?',
                              }
                        }
                        }}
                        actions={[
                            {
                                
                                icon: tableIcons.PermContactCalendarOutlined,
                                tooltip: "Page du consultation",
                                onClick: (event, rowData) =>{navigate("/Visits/"+rowData._id)},
                            },
                            {
                            icon: tableIcons.Add,
                            tooltip: "Ajouter une consultation",
                            isFreeAction: true,
                            onClick: (event) => {dispatch(setActivePatient(id)) ;navigate('/Visits/add')},
                            },
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search : false,
                            paging : false,
                            maxBodyHeight : 300,
                            minBodyHeight : 300,
                            // toolbar :false,
                            headerStyle: {
                                color: '#444' ,
                                fontWeight :'bold',
                                fontSize :'1.1rem',
                                position : 'sticky',
                                boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.1)',
                            },
                        }}
                />
            </Container>

            <Container sx={{ marginTop: headersMT}}  >
                    <Typography variant='h3' mt={headersMT} >Antécédent</Typography>
                    <MaterialTable 
                        columns={columnsH} 
                        data={patient.antecedents} 
                        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
                        localization={{
                        body:{
                            emptyDataSourceMessage :'Aucun Antécédent à afficher '
                        }
                        }}
                        options={{
                            actionsColumnIndex: -1,
                            search : false,
                            paging : false,
                            maxBodyHeight : 300,
                            minBodyHeight : 300,
                            toolbar :false,
                            headerStyle: {
                                color: '#444' ,
                                fontWeight :'bold',
                                fontSize :'1.1rem',
                                position : 'sticky',
                                boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.1)',
                            },
                        }}
                    />
            </Container>

        </Container>


    )

}

const PatienInfo = ({Icon,title,data})=> (
    <Grid item   direction="row" se >
        <Grid container direction="row" alignItems="center">
         {Icon&& <Icon sx= {{fontSize:'50px'}} color="secondary" /> }
          <Typography ml = {1} variant='h5' >{title}:</Typography>
          <Typography  ml = {1} variant='h5' >{data}</Typography>
      </Grid>
    </Grid>
  )
export default PatientInfoPage
