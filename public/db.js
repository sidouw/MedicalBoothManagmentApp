const  Datastore = require('nedb')
const path = require('path');

const compactInteval = 300000

const patientsDb = new Datastore({ filename: path.join(__dirname,'..','..','..','patients') })

patientsDb.loadDatabase((err)=>{
    console.log(err);
    patientsDb.persistence.setAutocompactionInterval(compactInteval)
})

const visitsDb = new Datastore({ filename: path.join(__dirname,'..','..','..','visits') })

visitsDb.loadDatabase((err)=>{
    console.log(err);
    visitsDb.persistence.setAutocompactionInterval(compactInteval)
})

const usersDb = new Datastore({ filename: path.join(__dirname,'..','..','..','users') })

usersDb.loadDatabase((err)=>{
    console.log(err);
    usersDb.persistence.setAutocompactionInterval(compactInteval)
})

const insitusDb = new Datastore({ filename: path.join(__dirname,'..','..','..','insitus') })

insitusDb.loadDatabase((err)=>{
    console.log(err);
    insitusDb.persistence.setAutocompactionInterval(compactInteval)
})

module.exports = {usersDb,patientsDb,visitsDb,insitusDb}

