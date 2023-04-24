import { Typography, Box, colors, Button } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';
import React from 'react'

function Header() {
  return (
    <Box>
        <Typography variant='h4' sx={{color: 'gold', p: 2, background: '#3C0B79', boxShadow:'0 2px 9px 0 #888888' }} gutterBottom>
            ProGenius
            <Button sx={{ml:'90rem', color:'#fff'}}><LogoutRounded/></Button>
        </Typography>
    </Box>
  )
}

export default Header;