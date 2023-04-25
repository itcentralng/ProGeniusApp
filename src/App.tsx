import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Main from './pages';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © Proposal.ai '}
      <Link color="inherit" href="https://mui.com/">
        Proposal AI Assistant
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
    
    return( 
     
    <div style={{background: '#F4F9FC',minHeight: '100vh'}}>
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
