import { Typography, Box, colors, Button } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';
import React from 'react'
import {useNavigate} from 'react-router-dom'
import mascot from '../components/images/[removal.ai]mascot.png'

function Header() {
    const navigate = useNavigate()
  return (
    <Box sx={{color: 'gold', p: 2, background: '#3C0B79', boxShadow:'0 2px 9px 0 #888888' }}>
        <Typography variant='h4'    
        onClick={()=>navigate('/')}>
            ProGenius
            <div style={{marginLeft:'90rem', color:'gold', fontSize: '1.3rem', marginTop: '-3rem'}}>
                               
                <Button sx={{color: '#fff'}}>  
                    <img src={`${mascot}`} width="40px" height="40px" 
                    style={{borderRadius: '50%', border: '3px solid #fff', boxShadow:'0 2px 9px 0 #888888', 
                    padding: '.1rem',}}  alt="Profile Image" />                  
                </Button>

                <Button>
                    <LogoutRounded sx={{color: '#fff'}}/>
                </Button>
            </div>
        </Typography>
        
    </Box>
  )
}

export default Header;