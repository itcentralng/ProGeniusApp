import { Button, Card, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header'
import Mascot from '../components/mascot'
import logo from '../components/images/logo.png';
import authComputer from '../components/images/auth_laptop.png';
import authFlyman from '../components/images/auth_flyman.png';

function Template() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const BEARER_TOKEN = localStorage.getItem('token');

    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(false);
    const [proposal, setProposal]: any = useState({});

    useEffect(() => {
        setProposal(location.state.proposal);
    }, []);

    return (

        <div style={{ background: '#000040', minHeight: '93.8vh' }}>


            <Header />

            <Grid sx={{ p: 12,  }} container spacing={1}>
                <Card>
                    {/* <Typography variant='h3' sx={{ background: '#000040', color: '#fff', opacity: .7, p: 8, py: 3, borderBottom: '1px solid black' }}>Modern Template</Typography> */}
                    <CardContent sx={{ p: 2, background: 'black' }}>

                        {!loader && (
                            <Grid sx={{ p: 6, color: '#fff' }} container spacing={4}>

                                <Grid item xs={12} md={6}>
                                    <Grid item xs={12} md={12}>
                                        <div style={{ width: '10%', border: '3px solid #fff' }}></div>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        {proposal?.company?.name}
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        {proposal?.company?.address}
                                    </Grid>

                                    <Grid item xs={12} md={12} sx={{ width: '20%', height: '50vh', border: '3px solid #fff', my: 2 }}>
                                        <Grid item xs={12} md={12} sx={{ m: 8, my: 15, p: 1, background: 'black', minWidth: '100%' }}>
                                            <Grid item xs={12} md={12}><Typography variant='h3' sx={{fontWeight: 'bold', color: 'gold'}}>Proposal</Typography></Grid>
                                            <Grid item xs={12} md={12} sx={{ minWidth: '25rem' }}><Typography variant='h4'>{proposal?.offering}</Typography></Grid>
                                            <Grid item xs={12} md={12}><Typography variant='h5' sx={{ borderBottom: '1px solid #fff' }}>{new Date(proposal.updated_at).getFullYear()}</Typography></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, mx: 2}}>
                                    <Grid item xs={12} sm={12} md={5} lg={5}>
                                        <Typography variant='h5'>PROPOSED TO:</Typography>
                                        <Typography variant='h6'>{proposal?.client?.name}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={7} lg={7} >
                                        <Typography variant='h5'>ORGANIZED BY:</Typography>
                                        <Typography variant='h6'>{proposal?.company?.name}</Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                        )}


                    </CardContent>
                </Card>
            </Grid>
        </div>

    )
}

Template.propTypes = {}
export default Template