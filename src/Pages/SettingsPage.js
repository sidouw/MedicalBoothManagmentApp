import React,{useState,useEffect} from 'react';

import {selectUser} from '../Store/Reducers/userReducer'
import {addInsituAsync,deleteInsituAsync,selectInsitus,setInsitus} from '../Store/Reducers/insitusReducer'
import ColorSettings from '../Components/ColorSettings'
import {useDispatch,useSelector} from 'react-redux'


import {Container,Typography} from '@mui/material'
import MaterialTable from "@material-table/core";
import tableIcons from "../Utils/MaterialTableIcons";

const {ipcRenderer} = window.require('electron') 

const usercolumns = [
  { title: "Utilisateur", field: "user",defaultSort : 'desc' },
  { title: "Mot de pass", field: "pass" },
]

const insitucolumns = [
  { title: "Insitu", field: "insitu",defaultSort : 'desc' },
  { title: "Tarif", field: "tarif",type:'numeric',initialEditValue:0 },
]



export default function SettingsPage() {

  const dispatch = useDispatch()
  const insitus = useSelector(selectInsitus)
  const user = useSelector(selectUser)

  const [userData,setUserData] = useState([])


  const addUser = (us)=>{
    ipcRenderer.invoke('addUser',{user:us.user,pass:us.pass,id:us.id}).then((users)=>{
      setUserData([...userData,{user:us.user,pass:us.pass,id:us.id}])
    })
    
  }
  const deleteUser = (id)=> {
    ipcRenderer.invoke('deleteUser',id).then((users)=>{
      const u = userData.filter((u)=>{
        return u._id!==id
      })
      setUserData(u)
    })
    
  }

  useEffect(()=>{

      if (user==='admin') {
        ipcRenderer.invoke('getUsers').then((users)=>{
          const u = users.filter((u)=>{
            return u.user!=='admin'
          })
          setUserData(u)
        })
      }
      
      if(insitus.length ===0){
        ipcRenderer.invoke('getInsitus').then((insits)=>{
          dispatch(setInsitus(insits))
        })
      }

  },[])

  return (
  <>

    <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto'}}>
      <Typography variant='h1' mt={3} mb = {3} >Paramétre</Typography>

     {user==='admin' && 
     <MaterialTable
        title="Utilisateur"
        data={userData}
        columns={usercolumns}
        icons={tableIcons}
        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)',marginBottom:'20px'}}
        editable={{

          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
                newData.id = "uuid-" + Math.random() * 10000000;
                if(!newData.user || !newData.user.trim()){
                  reject()
                  return
                }
                if(!newData.pass || !newData.pass.trim()){
                  reject()
                  return
                }
                addUser(newData)
                resolve()
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
                deleteUser(oldData._id)
                resolve();
            });
          },
        }}
        
        options = {{
            actionsColumnIndex: -1,
            // search : false,
            pageSize : 3,
            pageSizeOptions : [],
            maxBodyHeight :'250px',
            minBodyHeight : '250px',
            headerStyle: {
                color : '#444',
                fontWeight :'bold',
                fontSize :'1rem',
                position : 'sticky',
                boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.0)',
              },
            
        }}
        localization={{
            body:{
              emptyDataSourceMessage :'Aucun utilisateur à afficher ',
              editRow : {
                deleteText : 'Effacé cette entré ?? '
              }
            }
          }}
      />}

      <MaterialTable
        title="Geste insitu"
        data={insitus}
        columns={insitucolumns}
        icons={tableIcons}
        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
        editable={{

          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
                newData.id = "uuid-" + Math.random() * 10000000;
                if(!newData.insitu || !newData.insitu.trim()){
                  reject()
                  return
                }
                dispatch(addInsituAsync({...newData}))
                resolve()
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
                console.log(oldData);
                dispatch(deleteInsituAsync(oldData._id))
                resolve();
            });
          },
        }}
        
        options = {{
            actionsColumnIndex: -1,
            // search : false,
            pageSize : 3,
            pageSizeOptions : [],
            maxBodyHeight :'250px',
            minBodyHeight : '250px',
            headerStyle: {
                color : '#444',
                fontWeight :'bold',
                fontSize :'1rem',
                position : 'sticky',
                boxShadow :'0px 1px 2px 0px rgba(0,0,0,0.0)',
              },
            
        }}
        localization={{
            body:{
              emptyDataSourceMessage :'Aucun utilisateur à afficher ',
              editRow : {
                deleteText : 'Effacé cette entré ?? '
              }
            }
          }}
      />
      
    <ColorSettings/>

    </Container>
    </>
  );
}


