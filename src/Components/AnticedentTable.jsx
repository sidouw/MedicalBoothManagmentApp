import React from 'react'

import MaterialTable from "@material-table/core";
import tableIcons from "../Utils/MaterialTableIcons";


const cols = [
    { field: "maladie", title: "Maladie" },
    { field: "therapie", title: "Thérapeutique" }
];


export default function AntecedentTable({antecedents,setAntecedent}) {
  
    return (
      <MaterialTable
        title="Antécédent"
        data={antecedents}
        columns={cols}
        icons={tableIcons}
        style= {{boxShadow : 'none',border:'solid 1px rgba(0,0,0,.1)'}}
        editable={{

          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
                newData.id = "uuid-" + Math.random() * 10000000;
                setAntecedent([...antecedents, newData])
                resolve()
            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
                const dataUpdate = [...antecedents];
                const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                const index = dataUpdate.indexOf(target);
                dataUpdate[index] = newData;
                setAntecedent([...dataUpdate]);
                resolve();
            });
          },
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
                const dataDelete = [...antecedents];
                const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                const index = dataDelete.indexOf(target);
                dataDelete.splice(index, 1);
                setAntecedent([...dataDelete]);
                resolve();
            });
          },
        }}
        
        options = {{
            actionsColumnIndex: -1,
            search : false,
            pageSize : 3,
            pageSizeOptions : [],
            maxBodyHeight :'280px',
            minBodyHeight : '280px',
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
              emptyDataSourceMessage :'Aucun maladie à afficher ',
              editRow : {
                deleteText : 'Effacé cette entré ?? '
              }
            }
          }}
      />
    );
  }