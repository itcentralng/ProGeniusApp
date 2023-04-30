import { Button, Card, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header'
import Mascot from '../components/mascot'
import logo from '../components/images/logo.png';
import coverImage from '../components/images/template_one_cover.png';
import aboutImage from '../components/images/template_one_about.png';

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

    const [cover, setCover] = useState(1);
    const [about, setAbout] = useState(0);
    const toggleSection = (sectionId: number) => {
        switch (sectionId) {
            case 1:
                setCover(1);
                setAbout(0);
                break;
            case 2:
                setCover(0);
                setAbout(1);
                break;
            default:
                setCover(1);
                setAbout(0);
        }
    }

    return (

        <div style={{ background: '#fff', minHeight: '93.8vh' }}>

            <Header />

            <Grid sx={{ p: 6, }} container spacing={1}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Card>
                        {/* <Typography variant='h3' sx={{ background: '#000040', color: '#fff', opacity: .7, p: 8, py: 3, borderBottom: '1px solid black' }}>Modern Template</Typography> */}
                        <CardContent sx={{   }}>

                            {!loader && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={4}>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, mx: 2 }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                            <Typography variant='h5' sx={{ textAlign: 'center' }}>Cover</Typography>
                                            <Button onClick={() => toggleSection(1)}>
                                                <img src={coverImage} alt="Cover Image"
                                                    style={{
                                                        width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                        color: '#fff', border: '1px solid #fff'
                                                    }} />
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                            <Typography variant='h5' sx={{ textAlign: 'center' }}>About</Typography>
                                            <Button onClick={() => toggleSection(2)}>
                                                <img src={aboutImage} alt="About Image"
                                                    style={{
                                                        width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                        color: '#fff', border: '1px solid #fff'
                                                    }} />
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}


                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Card>
                        {/* <Typography variant='h3' sx={{ background: '#000040', color: '#fff', opacity: .7, p: 8, py: 3, borderBottom: '1px solid black' }}>Modern Template</Typography> */}
                        <CardContent sx={{ p: 2, background: 'black' }}>
                            {loader && 'Loading...'}

                            {!loader && cover && (
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
                                                <Grid item xs={12} md={12}><Typography variant='h3' sx={{ fontWeight: 'bold', color: 'gold' }}>Proposal</Typography></Grid>
                                                <Grid item xs={12} md={12} sx={{ minWidth: '25rem' }}><Typography variant='h4'>{proposal?.offering}</Typography></Grid>
                                                <Grid item xs={12} md={12}><Typography variant='h5' sx={{ borderBottom: '1px solid #fff' }}>{new Date(proposal.updated_at).getFullYear()}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, mx: 2 }}>
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <Typography variant='h5'>PROPOSED TO:</Typography>
                                            <Typography variant='h6'>{proposal?.client?.name}</Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={7} md={7} lg={7} >
                                            <Typography variant='h5'>ORGANIZED BY:</Typography>
                                            <Typography variant='h6'>{proposal?.company?.name}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}

                            {!loader && about && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={4}>

                                    <Grid item xs={12} md={6}>
                                        <Grid item xs={12} md={12} sx={{display:'flex', justifyContent: 'center', alignContent: 'end',}}>
                                            <Grid item xs={6} md={9}></Grid>
                                            <Grid item xs={6} md={3}>
                                                <div style={{ width: '60%', border: '3px solid #fff', margin:'.5rem' }}></div>
                                                <div style={{ width: '40%', border: '3px solid #fff', margin:'.5rem' }}></div>
                                                <div style={{ width: '20%', border: '3px solid #fff', margin:'.5rem' }}></div>
                                                <Typography variant='h4'>{new Date(proposal?.updated_at).getFullYear()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>About</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Company</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={12}  sx={{display:'flex', justifyContent: 'start', alignContent: 'center',}}>
                                            {proposal?.company?.logo != '' && (
                                                <>
                                                <img src={coverImage} alt="Company Image" style={{width: '20rem', height: '20rem'}} />
                                                <div style={{ height: '5rem',marginLeft: '10rem', borderLeft: '3px solid #fff' }}></div> 
                                                </>  
                                            )}
                                            
                                            {proposal?.company?.logo == '' && (
                                                <>
                                                <div style={{ height: '5rem',borderLeft: '3px solid #fff', }}></div> 
                                                </>  
                                            )}  
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ width: '100%',   my: 2 ,}}>
                                        {proposal?.components?.filter((c:any)=>c.code == 'about')[0]?.content}
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, mx: 2 }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>                                         
                                            <div style={{ height: '5rem',borderBottom: '3px solid #fff', }}></div> 
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>

    )
}

Template.propTypes = {}
export default Template