import React,{useEffect} from 'react'

import {selectInsitus} from '../Store/Reducers/insitusReducer'
import {useSelector} from 'react-redux'

import MaterialTable from "@material-table/core";
import tableIcons from "../Utils/MaterialTableIcons";


const cols = [
    { field: "insitu", title: "Insitu",lookup: { '34': 'İstanbul', '63': 'Şanlıurfa' }},
    { field: "tarif", title: "Tarif",type : 'numeric',initialEditValue:0 }
];

export default function InsituTable({insitus,setInsitus}) {
    const insit = useSelector(selectInsitus)
    
    useEffect(()=>{
      const look = {}
      for (let index = 0; index < insit.length; index++) {
        look[insit[index].insitu] =  insit[index].insitu
      }
      cols[0].lookup={...look}
      cols[0]['initialEditValue']= insit[0]? insit[0]._id : ""
    },[insit])

    return (
      <MaterialTable
        title="Geste Insitu"
        data={insitus}
        columns={cols}
        icons={tableIcons}
        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
        editable={{

          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
                newData.id = "uuid-" + Math.random() * 10000000
                console.log(newData);
                setInsitus([...insitus, newData])
                resolve()
            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
                const dataUpdate = [...insitus];
                const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                const index = dataUpdate.indexOf(target);
                dataUpdate[index] = newData;
                setInsitus([...dataUpdate]);
                resolve();
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
                const dataDelete = [...insitus];
                const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                const index = dataDelete.indexOf(target);
                dataDelete.splice(index, 1);
                setInsitus([...dataDelete]);
                resolve();
            });
          },
        }}
        
        options = {{
            actionsColumnIndex: -1,
            search : false,
            pageSize : 3,
            pageSizeOptions : [],
            maxBodyHeight :'300px',
            minBodyHeight : '300px',
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
              emptyDataSourceMessage :'Aucun insitu à afficher ',
              editRow : {
                deleteText : 'Effacé cette entré ?? '
              }
            }
          }}
      />
    );
  }