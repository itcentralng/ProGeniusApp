import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Main from './pages';

function Copyright() {
  return (
    <div style={{background: '#000040', color:'#fff',  padding: '1rem'}}>
    <Typography variant="body2" align="center">
      {'Copyright © ProGenius. '}
      <Link color="inherit" href="https://lablab.ai/">
        Powered by Lablab.ai
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
    </div>
  );
}

export default function App() {
    
    return( 
     
    <div style={{ minHeight: '98vh'}}>
    {/* <Container>
      <Box>
        <Main/>
        <Copyright/> 
      </Box>
    </Container> */}
    <Main/>
    <Copyright/> 
    </div>  
  )
}
