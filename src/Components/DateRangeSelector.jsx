import React,{useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import moment from 'moment';

export default function DateRangeSelector({setRange,startOffset=0,endOffset=0}) {
    const [startDate,setStartDate] = useState(moment().subtract(startOffset,'day').format('yyyy-MM-DD'))
    const [endDate,setEndDate] = useState(moment().add(endOffset,'day').format('yyyy-MM-DD'))

    useEffect(()=>{
        if(moment(endDate).isBefore(moment(startDate)))
            return
        setRange && setRange({start:startDate,end:endDate})
    },[startDate,endDate])

  return <div style= {{display:'flex',justifyContent:'space-around', maxWidth : '400px', minWidth : '400px'}} >
            <TextField
                label="Date debut"
                type="date"
                value={startDate}
                onChange = {e=>setStartDate(e.currentTarget.value)}
                sx={{ width: 180 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                label="Date fin"
                type="date"
                value={endDate}
                onChange = {e=>setEndDate(e.currentTarget.value)}
                sx={{ width: 180 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
        </div>
}
