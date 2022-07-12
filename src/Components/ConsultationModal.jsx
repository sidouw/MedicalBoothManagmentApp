import React from 'react'
import Modal from 'react-modal';
import ConsultationForm from './ConsultationForm'
// import {useSelector,useDispatch} from 'react-redux';

Modal.setAppElement('#root');

export default ({open,setOpen})=>{

// const active = useSelector(selectActivePatient)
// const dispath = useDispatch()
// isOpen={active!==''}
//         onRequestClose={()=>dispath(setActivePatient(''))}
return(
    
    <Modal
        isOpen = {open}
        onRequestClose={()=>setOpen(!open)}
        contentLabel="Example Modal"
        className="ConsModal"
        overlayClassName="Overlay"
        >
        <ConsultationForm/>
    </Modal>

)
}

