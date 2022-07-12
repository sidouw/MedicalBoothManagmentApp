import React,{useEffect,useState} from 'react';

import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';

import {selectVisits,deleteVisitAsync} from '../Store/Reducers/visitReducer'
import {selectPatients} from '../Store/Reducers/patientsReducer'



import {Container} from '@mui/material'
import MaterialTable from "@material-table/core";
import tableIcons from "../Utils/MaterialTableIcons";




const columns = [
    { title: "Date", field: "date",defaultSort : 'desc' },
    { title: "Patient", field: "patient" },
    { title: "Motif", field: "motif" },
    { title: "Diagnostique", field: "diagnostic" },
    { title: "Médecin", field: "medcin" },
    { title: "Tarif", field: "tarif" },
  ]



const ConsultationsPage = ()=>{

    const navigate = useNavigate();
    const visits =useSelector(selectVisits)
    const patients =useSelector(selectPatients)
    const [data,setData] =useState([])
    const dispatch = useDispatch()


    useEffect (()=>{
      if (visits.length===0)
        return 
      console.log(visits);
      const d =  visits.map(v=> {
                                try {
                                  const name = patients.find(p=>p._id===v.patient).prenom
                                  const last = patients.find(p=>p._id===v.patient).nom
                                  return {...v,patient:name+' '+last}
                                } 
                                catch (error) {
                                  return {...v,patient:'patient'}
                                }
                                  
                        })
      setData(d)
    }
    ,[visits])

    return (

      <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto',alignSelf:'center'}}>
          
          <MaterialTable 
              title="Consultations"
              icons={tableIcons}  
              columns={columns} 
              data={data} 
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
                },
                grouping:{
                  placeholder: 'Glisser les en-têtes ici pour regrouper par',
                  groupedBy:'Regrouper par'
                }
              }}
              actions={[
                  {
                    icon: tableIcons.PermContactCalendarOutlined,
                    tooltip: "Page du consultation",
                    onClick: (event, rowData) =>{navigate("/Visits/"+rowData._id)},
                  },
                ]}
                
              options={{
                  actionsColumnIndex: -1,
                  search : true,
                  paging : true,
                  pageSize : 10,
                  thirdSortClick : false,
                  maxBodyHeight : '70vh',
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
      </Container>
    )
}

export default ConsultationsPage