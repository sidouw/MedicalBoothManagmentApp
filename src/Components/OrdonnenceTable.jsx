import React from 'react'

import MaterialTable from "@material-table/core";
import tableIcons from "../Utils/MaterialTableIcons";


const cols = [
    { field: "medicament", title: "Médiacment" },
    { field: "dose", title: "Dose",type: 'numeric',initialEditValue:1}
];

export default function OrdonnenceTable({medic,setMedic}) {
  
    return (
      <MaterialTable
        title=""
        data={medic}
        columns={cols}
        icons={tableIcons}
        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
        editable={{

          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
                newData.id = "uuid-" + Math.random() * 10000000;
                console.log(newData);
                if(!newData.medicament || !newData.medicament.trim()){
                  reject()
                  return
                }
                setMedic([...medic, newData])
                resolve()
            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
                const dataUpdate = [...medic];
                const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                const index = dataUpdate.indexOf(target);
                dataUpdate[index] = newData;
                setMedic([...dataUpdate]);
                resolve();
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
                const dataDelete = [...medic];
                const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                const index = dataDelete.indexOf(target);
                dataDelete.splice(index, 1);
                setMedic([...dataDelete]);
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
              emptyDataSourceMessage :'Aucun medicament à afficher ',
              editRow : {
                deleteText : 'Effacé cette entré ?? '
              }
            }
          }}
      />
    );
  }