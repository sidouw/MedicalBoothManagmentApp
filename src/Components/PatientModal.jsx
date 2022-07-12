import React from 'react'
import Modal from 'react-modal';
import MyForm from './PatientForm'
import {useDispatch} from 'react-redux';
import {setActivePatient} from '../Store/Reducers/patientsReducer'

Modal.setAppElement('#root');

export default ({open,setOpen})=>{

const dispath = useDispatch()
return(
    
    <Modal
        isOpen={open}
        onRequestClose={()=>{dispath(setActivePatient(''));setOpen(!open)}}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        >
            <MyForm setOpen = {setOpen}/>
    </Modal>

)
}

