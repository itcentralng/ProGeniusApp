import { Button, Grid, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react' 
import {useNavigate } from 'react-router-dom';
import Header from '../components/header' 
import Mascot from '../components/mascot'
import logo from '../components/images/logo.png';
import computer from '../components/images/computer.png'; 

function Home() {
     
    const navigate = useNavigate();
    return (
         
        <div style={{height: '91.5vh', background: '#000040',}}>
          
            <Header/>

            <div id='eclipse1' style={{position: 'absolute',width: '550px',height: '554px', left: 'calc(50% - 550px/2 - 282px)', top: '-99px',
                background: 'rgba(138, 209, 210, 0.3)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', filter: 'blur(199.5px)'}}></div>
            <div id="eclipse2" style={{position: 'absolute',width: '550px', height: '536px', left: 'calc(50% - 550px/2 + 579px)', top: '286px',
                background: 'rgba(138, 209, 210, 0.7)', filter: 'blur(199.5px)'}}></div>

            <Grid sx={{p:4}} container>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Typography variant='h2' sx={{color: '#fff', p: 20}}>
                    Proposals<br/> Made Easy with<br/> ProGenius!
                  </Typography>
                  <Typography variant='h6' sx={{color: '#fff', px: 20, my: -18}}>
                    Say goodbye to proposal headaches<br/>
                    and hello to productivity.                    
                  </Typography>

                  <Button sx={{mx:20,my:19,p:1.8, px:2, color: '#fff', border: '1.5px solid white', borderRadius: '5%', boxShadow:'0 2px 9px 0 #888888'}} 
                  onClick={()=>navigate('/register')}>
                    Try it now!
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={computer} style={{padding: '1rem'}} alt="Computer Image" width={'600rem'} height={'600rem'}/>
                </Grid>   

            </Grid>
        </div>           
         
    )
}

Home.propTypes = {}
export default Home