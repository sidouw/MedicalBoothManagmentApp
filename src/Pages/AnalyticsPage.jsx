import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'

import moment from 'moment'

import DateRangeSelector from '../Components/DateRangeSelector'
import Chart from '../Components/Chart'

import {Tour,Healing,AttachMoney} from '@mui/icons-material'
import {Card,Grid,CardContent,Container,Typography,Paper} from '@mui/material'

const {ipcRenderer} = window.require('electron') 




  
export default function Dashboard() {

    
    const [dateRange,setDateRange] = useState({start :moment().format('yyyy-MM-DD'),end :moment().format('yyyy-MM-DD')})

    const [chartDateRange,setChartDateRange] = useState({start :moment().subtract(7,'day').format('yyyy-MM-DD'),end :moment().format('yyyy-MM-DD')})

    const [nbInsitu,setNbInsitu] = useState(0)
    const [nbVisits,setNbVisits] = useState(0)
    const [revVisits,setRevVisits] = useState(0)
    const [revInsitu,setRevInsitu] = useState(0)

    const [visits,setVisits] = useState([])
    const [chartData,setChartData] = useState([])

    const getRange = (startDate, endDate, type='day')=> {
        const fromDate = moment(startDate)
        const toDate = moment(endDate)
        const diff = toDate.diff(fromDate, 'day')
        const range = []
        
        for (let i = 0; i <= diff; i++) {
          range.push(moment(fromDate).add(i,type).format('YYYY-MM-DD'))
        }
        return range
      }

    const createChartData = ()=>{
        const range = getRange(chartDateRange.start,chartDateRange.end)
        const d = []
        range.forEach((date)=>{
            d.push({ time:date.slice(5), Consultations: visits.filter(v => v.date==date).length})
        })
        setChartData(d)
    }

    useEffect(()=>{
        ipcRenderer.invoke('getVisitsData').then((vis)=>{
            setVisits(vis)
        })
    },[])

    useEffect(()=>{
        createChartData()
    },[chartDateRange])

    useEffect(()=>{
        let nbv =0
        let nbi = 0
        let revv = 0
        let revi = 0

        for (let index = 0; index < visits.length; index++) {
            const v = visits[index];
            console.log(dateRange.start,dateRange.end);
            if (moment(v.date).isBetween(dateRange.start,dateRange.end,null,'[]')){

                nbv++
                nbi += v.insitu.length
                revv += parseInt(v.tarif)
                v.insitu.forEach((i)=>{
                    revi += parseInt(i.tarif)
                })
            }
        }

        createChartData()
        setNbInsitu(nbi)
        setNbVisits(nbv)
        setRevVisits(revv)
        setRevInsitu(revi)

    },[dateRange,visits])


  return (
            <Container maxWidth = 'xl' sx = {{maxHeight : '95.5vh',overflowY : 'auto',overflowX : 'hidden'}} >
                
                <Typography mb = {3} variant='h1' > Analytique </Typography>

                <DateRangeSelector setRange={setDateRange} />

                <Grid mt={1} container  spacing = {3}  >
                    <Stat Icon={Tour} title = "Consultations"  data= {nbVisits} />
                    <Stat Icon={Healing} title = "Geste insitu"  data= {nbInsitu} />
                    <Stat Icon={AttachMoney} title = "Revenu total"  data= {revVisits+revInsitu + ' DA'} />
                    <Grid item container  spacing = {3}  > 
                        <Stat Icon={AttachMoney} title = "Revenu des consultations"  data= {revVisits + ' DA'} />
                        <Stat Icon={AttachMoney} title = "Revenu des geste Insitu"  data= {revInsitu + ' DA'} />
                    </Grid>
                </Grid>

                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                    margin : '10px 0 0 5px'
                  }}
                >
                    <DateRangeSelector setRange={setChartDateRange} startOffset = {7} />
                    <Chart data= {chartData} title = {`Consultations des ${moment(chartDateRange.end).diff(moment(chartDateRange.start), 'day')} derniers jours`} />
                </Paper>
            </Container>
    )
}

const Stat = ({Icon,title,data})=> {
    return (
    <Grid item>
      <Card sx={{maxHeight:160 }}>
        <CardContent>
            <Grid container direction="row" alignItems="center" wrap = "nowrap" >
                {Icon&& <Icon color='secondary'  sx= {{fontSize:'50px'}} /> }
                <Typography color='secondary' gutterBottom variant="h5" >
                    {title}
                </Typography>
            </Grid>

            <Typography color='secondary' sx = {{fontWeight : 600}} variant="h3"  >
                {data}
            </Typography>
        </CardContent>
      </Card>
    </Grid>
    );
  }
  