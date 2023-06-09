import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header'
import Mascot from '../components/mascot'
import logo from '../components/images/logo.png';
import authComputer from '../components/images/auth_laptop.png';
import authFlyman from '../components/images/auth_flyman.png';
import { ScaleLoader } from "react-spinners";

function Register() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODI1OTM1MTEsImlhdCI6MTY4MjUwNzExNCwic3ViIjoxLCJyb2xlIjpudWxsfQ.oCeMxP77br2_Lqs0E0OZRM4svSqBO0WgrsVue3bdi8s`;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const save = async () => {
        if(email == '' || password == '')return alert("All fields are required")
        try {
            setLoader(true);
            const request = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    //authorization: `bearer ${BEARER_TOKEN}`,
                },
                body: JSON.stringify({
                    email, password
                }),
            });
            const response = await request.json();
            setLoader(false);
            if (request.ok) {
                //localStorage.setItem('token', response.message);
                if (response.message == 'User created') navigate(`/login`, { state: response?.id })
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    return (

        <div style={{ background: '#000040', }}>

            <Header />

            <div id='eclipse1' style={{
                position: 'absolute', width: '500px', height: '554px', left: 'calc(50% - 550px/2 - 282px)', top: '-99px',
                background: 'rgba(138, 209, 210, 0.3)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', filter: 'blur(199.5px)',
                zIndex:-9999
            }}></div>
            <div id="eclipse2" style={{
                position: 'absolute', width: '500px', height: '536px', left: 'calc(50% - 550px/2 + 579px)', top: '286px',
                background: 'rgba(138, 209, 210, 0.7)', filter: 'blur(199.5px)'
            }}></div>
            <div id="eclipse3" style={{
                position: 'absolute', width: '460px', height: '460px', left: 'calc(50% - 460px/2 - 283px)', top: '256px',
                background: '#AAD9D9', borderRadius: '50%'
            }}></div>

            <Grid sx={{ p: 4 }} container>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <img src={authComputer} alt="Computer Image" width={'320rem'} height={'300rem'}
                        style={{
                            padding: '1rem', position: 'absolute', left: 'calc(45% - 300px/2 - 280px)', top: '210px',
                            zIndex: 200
                        }} />
                    <img src={authFlyman} alt="Computer Person" width={'600rem'} height={'600rem'}
                        style={{
                            padding: '1rem', position: 'absolute', left: 'calc(9% - 714px/2 + 554px)', top: '178px',
                            transform: 'matrix(-1, 0, 0, 1, 0, 0)'
                        }} />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} sx={{p:10, py:20}}>
                        <>
                            <Grid item xs={12} md={12}>
                                <Typography variant='h2' sx={{color: '#fff', p: 1}}>
                                    Register
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField onChange={(e) => setEmail(e.target.value)} sx={{background: '#fff'}}
                                    required
                                    id="email" 
                                    fullWidth
                                    placeholder='Enter email'
                                    value={email}
                                    type="email" 
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField onChange={(e) => setPassword(e.target.value)} sx={{ background:'#fff', border: '1px solid #fff', my:2, }}
                                    required
                                    id="password" 
                                    fullWidth 
                                    placeholder='*****' 
                                    type="password"
                                    value={password}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button sx={{p: 2, width: '10rem', color: '#fff', border: '1.5px solid white', borderRadius: '5%', boxShadow:'0 2px 9px 0 #888888'}} 
                                onClick={()=>save()}>
                                    {loader ? (
                                        <ScaleLoader color="#ffffff" height={15} />
                                            ) : ("Signup")}
                                </Button>
                            </Grid>
                        </>
                    
                </Grid>

            </Grid>
        </div>

    )
}

Register.propTypes = {}
export default Register