const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const db = require('./db')
const path = require('path');
const isDev = require('electron-is-dev');
const { exit } = require('process');

let mainWindow;

const webPreferences = { webSecurity: false,nodeIntegration: true,contextIsolation: false,enableRemoteModule: true}

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    minWidth: 1200,
    minHeight: 750,
    webPreferences,
    frame:false
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => mainWindow = null);

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('min', (event, arg) => {
  
  mainWindow.minimize()
  
})

ipcMain.on('max', (event, arg) => {
  if(mainWindow.isMaximized()){
    mainWindow.restore()
  }else{
    mainWindow.maximize()
  }
})

ipcMain.on('close', (event, arg) => {
  mainWindow.close()
  app.quit();
  exit()
})

// Patients
ipcMain.handle('getPatientsData',async (e,arg)=>{
    const result = await new Promise((resolve, reject) => {
      db.patientsDb.find({},(err,docs)=>{
        if (err)
          reject(err)
        resolve(docs);
      })
    })
    return result
    
})

ipcMain.handle('addPatient',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
      db.patientsDb.insert(arg,(err,docs)=>{
        if (err)
          reject(err)
        resolve(docs);
      })
    })
  return result
      
})

ipcMain.handle('deletePatient',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
    db.patientsDb.remove({ _id: arg }, {}, function (err, numRemoved) {
      if (err)
          reject(err)
        resolve(numRemoved);
      })
    });
  return result
      
})


// Visists
ipcMain.handle('getVisitsData',async (e,arg)=>{
  const result = await new Promise((resolve, reject) => {
    db.visitsDb.find({},(err,docs)=>{
      if (err)
        reject(err)
      resolve(docs);
    })
  })
  return result
}) 

ipcMain.handle('getPatientVisits',async (e,arg)=>{
  const result = await new Promise((resolve, reject) => {
    db.visitsDb.find({patient: arg},(err,docs)=>{
      if (err)
        reject(err)
      resolve(docs);
    })
  })
    return result
})  

ipcMain.handle('editPatient',async (e,arg)=>{
  const result = await new Promise((resolve, reject) => {
      db.visitsDb.update({_id:arg._id},{...arg},{},(err,numReplaced)=>{
        if (err)
          reject(err)
        resolve(numReplaced);
      })
    })
  return result
      
})

ipcMain.handle('addVisit',async (e,arg)=>{
  const result = await new Promise((resolve, reject) => {
    db.visitsDb.insert(arg,(err,docs)=>{
      if (err)
        reject(err)
      resolve(docs);
    })
  })
return result
      
})

ipcMain.handle('deleteVisit',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
    db.visitsDb.remove({ _id: arg }, {}, function (err, numRemoved) {
      if (err)
          reject(err)
        resolve(numRemoved);
      })
    });
  return result
      
})
// Login

ipcMain.handle('login',async (e,arg)=>{
  if(arg.user ==='admin' && arg.pass === 'admin')
    return [{ user: arg.user,pass:arg.pass }]
  const result = await new Promise((resolve, reject) => {
    db.usersDb.find({ user: arg.user,pass:arg.pass }, {}, function (err,docs) {
      if (err)
          reject(err)
        resolve(docs);
      })
    });
  return result
      
})

ipcMain.handle('getUsers',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
    db.usersDb.find({}, {}, function (err,docs) {
      if (err)
          reject(err)
        resolve(docs);
      })
    });
  return result
      
})

ipcMain.handle('addUser',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
      db.usersDb.insert(arg,(err,docs)=>{
        if (err)
          reject(err)
        resolve(docs);
      })
    })
  return result
      
})

ipcMain.handle('deleteUser',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
    db.usersDb.remove({ _id: arg }, {}, function (err, numRemoved) {
      if (err)
          reject(err)
        resolve(numRemoved);
      })
    });
  return result
      
})

ipcMain.handle('getInsitus',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
    db.insitusDb.find({}, {}, function (err,docs) {
      if (err)
          reject(err)
        resolve(docs);
      })
    });
  return result
      
})

ipcMain.handle('addInsitu',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
      db.insitusDb.insert(arg,(err,docs)=>{
        if (err)
          reject(err)
        resolve(docs);
      })
    })
  return result
      
})

ipcMain.handle('deleteInsitu',async (e,arg)=>{

  const result = await new Promise((resolve, reject) => {
    db.insitusDb.remove({ _id: arg }, {}, function (err, numRemoved) {
      if (err)
          reject(err)
        resolve(numRemoved);
      })
    });
  return result
      
})