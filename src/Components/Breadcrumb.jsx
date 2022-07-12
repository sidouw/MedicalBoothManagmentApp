import  React from 'react';

import {useLocation} from 'react-router-dom'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const Breadcrumb = ()=> {
  const location = useLocation()
  console.log(location);
  return (

      <Breadcrumbs sx={{position:'absolute',left :'280px'}} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/components/breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
  );
}
export default  Breadcrumb