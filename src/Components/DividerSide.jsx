import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';


const DividerMiddel =({children,fSize = 16,marginSide = 0})=> (
    <Grid item container alignItems="center" spacing={2} style= {{margin :'-5px -8px',padding:'0px 8px'}}>
        <Grid item> 
            <InputLabel style={{color:'#444',fontWeight :'700',fontSize : fSize+'px',fontFamily : 'PTSans',marginLeft : marginSide+'px'}} variant = "standard">{children}</InputLabel> 
        </Grid>
        <Grid item xs>
            <Divider />
        </Grid>
    </Grid>
)

export default DividerMiddel