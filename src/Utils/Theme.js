import { createTheme } from '@mui/material/styles';

const colorT = '#ff4'

const theme = createTheme({

typography: {

    fontFamily: 'PTSans',
    color : colorT,
    h1:{
        color : colorT,
        fontWeight : 600
    },
    h2:{
        color : colorT,
        fontWeight : 600
    },
    h3:{
        color : colorT
    },
    h4:{
        color : colorT
    },
    h5:{
        color : colorT
    },
    h6:{
        color : colorT,
        fontSize : '2rem'
    }
    },
palette: {
    primary: {
      main: "#E74C3C",
    },
    secondary: {
      main: "#444",
    },
  },
});

export default theme
