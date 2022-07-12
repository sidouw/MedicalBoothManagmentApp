import React from 'react'

import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import {selectVisitID} from '../Store/Reducers/visitReducer'
import {selectPatientID} from '../Store/Reducers/patientsReducer'

import MaterialTable from "@material-table/core";
import {Container,Typography,Grid} from '@mui/material'
import {Person,CalendarToday,AttachMoney} from '@mui/icons-material';

const paragraphML = 3
const headersMT = 2

const pageHeaderVar = 'h1'
const sectionHeaderVar = 'h2'
const subSectionHeaderVar = 'h3'



const columnsI = [
  { title: "Insitu", field: "insitu" },
  { title: "Tarif", field: "tarif" },
]

const columnsO = [
  { title: "Medicament", field: "medicament" },
  { title: "Dose", field: "dose" },
]

export default function ConsultationPage() {

  const { id } = useParams();
  const visit = useSelector(selectVisitID(id))
  const patient = useSelector(selectPatientID(visit.patient))
  console.log(visit);
  console.log(patient);

  return (
    <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto'}} >

      <Typography variant={pageHeaderVar} mt={headersMT} mb ={4}  >Consultation</Typography>

      <Container maxWidth = 'xl' >
          <Grid
                container
                direction="row"
                alignItems="center"
                spacing={2}
              >
            <ConsultationInfo Icon={Person} title = 'Patien' data={patient.nom + ' ' + patient.prenom} />
            <ConsultationInfo Icon={CalendarToday} title = 'Date' data={visit.date} />
            <ConsultationInfo Icon={AttachMoney} title = 'Tarif' data={visit.tarif+' DA'} />

          </Grid>
      </Container>
      
      <Container maxWidth = 'xl' >

      <Typography variant={sectionHeaderVar} mt={headersMT} >Description</Typography>

      <ConsultationElement title='Motif de Consultation' vr={subSectionHeaderVar} data = {visit.motif} />
      <ConsultationElement title='Histoire de la maladie' vr={subSectionHeaderVar} data = {visit.histoire} />

      </Container>

      <Container maxWidth = 'xl' >
        
          <Typography variant={sectionHeaderVar} mt={headersMT} >Examen</Typography>

          <ConsultationElement title='Clinique' vr={subSectionHeaderVar} data = {visit.clinique} />
          <ConsultationElement title='Biologie' vr={subSectionHeaderVar} data = {visit.biologie} />
          <ConsultationElement title='Radiologie' vr={subSectionHeaderVar} data = {visit.radiologie} />
          <ConsultationElement title='Conclusion' vr={subSectionHeaderVar} data = {visit.conclusion} />
          <ConsultationElement title='Diagnostique' vr={subSectionHeaderVar} data = {visit.diagnostic} />

      </Container>

      <Container maxWidth = 'xl' >
        
          <Typography variant='h2' mt={headersMT} >Conduit a tenir</Typography>

          <Container  >
            <Typography variant='h3' mt={headersMT} >Gestes insitu</Typography>

              <MaterialTable 
                              style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
                              columns={columnsI} 
                              data={visit.insitu} 
                              localization={{
                              body:{
                                  emptyDataSourceMessage :'Aucun insitu à afficher '
                              }
                              }}
                              options={{
                                  actionsColumnIndex: -1,
                                  search : false,
                                  paging :false,
                                  maxBodyHeight : 300,
                                  minBodyHeight : 300,
                                  toolbar :false,
                                  headerStyle: {
                                      color: '#444' ,
                                      fontWeight :'700',
                                      fontSize :'1.3rem',
                                      position : 'sticky',
                                      boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.05)',
                                  },
                                  
                              }}
                          />
          </Container> 

          <Container  >
            <Typography variant='h3' mt={headersMT} >Ordonnence</Typography>
              <MaterialTable 
                                style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
                                columns={columnsO} 
                                data={visit.ordonnence} 
                                localization={{
                                body:{
                                    emptyDataSourceMessage :'Aucun ordonnence à afficher '
                                }
                                }}
                                options={{
                                    actionsColumnIndex: -1,
                                    search : false,
                                    paging :false,
                                    maxBodyHeight : 300,
                                    minBodyHeight : 300,
                                    toolbar :false,
                                    headerStyle: {
                                        color: '#444' ,
                                        fontWeight :'700',
                                        fontSize :'1.3rem',
                                        position : 'sticky',
                                        boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.05)',
                                    },
                                    
                                }}
                            />
          </Container>      

          <Container  >
            <Typography variant='h3' mt={headersMT} >Autre</Typography>
            <Typography paragraph = {true} ml={paragraphML} mt={headersMT} >{visit.autre}</Typography>
          </Container>  

      </Container>
      
    </Container>
  )
}


const ConsultationInfo = ({Icon,title,data})=> (
    <Grid item   direction="row" se >
        <Grid container direction="row" alignItems="center">
          <Icon sx= {{fontSize:'50px'}} /> 
          <Typography ml = {1} variant='h5' >{title}:</Typography>
          <Typography  ml = {1} variant='h5' >{data}</Typography>
      </Grid>
    </Grid>
  )

const ConsultationElement = ({title,data,vr})=>(
  <Container >
    <Typography variant={vr} mt={headersMT} >{title}</Typography>
    <Typography paragraph = {true} ml={paragraphML} mt={headersMT} >{data}</Typography>
  </Container>
)


const ipsom = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n Ut ac ipsum sed est bibendum lobortis sed nec sem. Donec eu gravida risus. Maecenas non sodales urna. Donec dapibus erat interdum malesuada pharetra. Phasellus quam mi, ornare vitae porta imperdiet, rhoncus non diam. Sed congue accumsan nunc in cursus. Donec congue justo mollis ullamcorper pretium.

Aenean suscipit condimentum turpis in lobortis. Proin in nisl eros.\n Aliquam ultricies condimentum leo sed posuere. In lacinia tempor efficitur. Integer mi leo, tincidunt ut nisi eget, sollicitudin lobortis massa. Donec feugiat id enim at condimentum. Donec lorem lectus, volutpat vel purus id, accumsan consequat lorem. Nulla efficitur nisl tellus, iaculis tempus erat mollis ut. Praesent vitae justo sollicitudin quam rutrum pharetra id id lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi lacinia sit amet dolor nec sollicitudin. Sed id interdum velit, vitae laoreet lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed varius, lectus quis vestibulum pellentesque, felis mi tincidunt ante, sed aliquet nisl mi in tellus.

`
