import { Button, Card, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header'
import Mascot from '../components/mascot'
import logo from '../components/images/logo.png';
import authComputer from '../components/images/auth_laptop.png';
import authFlyman from '../components/images/auth_flyman.png';

function NewCompany() {
    const BASE_URL = `https://ai.proposal.itcentral.ng`;
    const BEARER_TOKEN = localStorage.getItem('token');

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
     
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [rep, setRep] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    
     

    const upload = async (event: { preventDefault: () => void; target: { files: (string | Blob)[]; }; }) => {
        setLoader(true);
        event.preventDefault();
        const data = new FormData();
        data.append('file',event.target.files[0] );

        if ( logo == '' ){
            setLoader(false);
            return alert("File is required")
        }

        try {
            
            const request = await fetch(`${BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                     authorization: `bearer ${BEARER_TOKEN}`,
                },
                body: data,
            });
            const response = await request.json();
            setLoader(false);
            if (request.ok) {
                 
            }
        } catch (error) {
            alert(`Error: ${error}`);
            setLoader(false);
            console.log(error);
        }
    }

    const save = async () => {
        setLoader(true);
        if (name == '' || //logo== '' || 
            description =='' || address == '' || rep == '' || role =='' || phone =='' || email ==''){
            setLoader(false);
            return alert("All fields are required")
        }
        try {
            setLogo('https://dhfspace.fra1.digitaloceanspaces.com/dhfspace/qjv7h55zq5.png');
            const request = await fetch(`${BASE_URL}/client`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                     authorization: `bearer ${BEARER_TOKEN}`,
                },
                body: JSON.stringify({
                    name, logo, description, address, rep, role, phone, email
                }),
            });
            const response = await request.json();
            setLoader(false);
            if (request.ok) {
                 navigate('/dashboard');
            }
        } catch (error) {
            alert(`Error: ${error}`);
            setLoader(false);
            console.log(error);
        }
    }

    return (

        <div style={{ height: '93.8vh', background: '#000040', }}>


            <Header />

            <Grid sx={{ p: 12 }} container spacing={1}>
                <Card>
                    {/* <Typography variant='h3' sx={{ color: '#3C0B79',p:8, py:3, borderBottom: '1px solid black' }}>New Proposal</Typography> */}
                    <Typography variant='h3' sx={{ background: '#3C0B79', color: '#fff', opacity: .7, p: 8, py: 3, borderBottom: '1px solid black' }}>New Company</Typography>
                    <CardContent>

                        {!loader && (
                            <Grid sx={{ p: 6 }} container spacing={4}>
                                
                                <Grid item xs={12} md={6}>
                                    <TextField onChange={(e) => setName(e.target.value)}
                                        required
                                        id="name"
                                        label="Name"
                                        fullWidth
                                        autoComplete="Name"
                                        variant="standard"
                                        value={name}
                                    />
                                </Grid>

                                {/* <Grid item xs={12} md={6}>
                                    <TextField onChange={(e) => upload}
                                        required
                                        id="logo"
                                        label="Logo"
                                        fullWidth
                                        autoComplete="Logo"
                                        variant="standard"
                                        value={logo} 
                                        type='file'  
                                    />
                                </Grid> */}

                                <Grid item xs={12} md={12}>
                                    <TextField onChange={(e) => setDescription(e.target.value)}
                                        required
                                        id="description"
                                        label="Description"
                                        fullWidth
                                        autoComplete="Description"
                                        variant="standard"
                                        value={description}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField onChange={(e) => setAddress(e.target.value)}
                                        required
                                        id="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="Address"
                                        variant="standard"
                                        value={address}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField onChange={(e) => setRep(e.target.value)}
                                        required
                                        id="rep"
                                        label="Rep"
                                        fullWidth
                                        autoComplete="Rep"
                                        variant="standard"
                                        value={rep}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField onChange={(e) => setRole(e.target.value)}
                                        required
                                        id="role"
                                        label="Role"
                                        fullWidth
                                        autoComplete="Role"
                                        variant="standard"
                                        value={role}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField onChange={(e) => setPhone(e.target.value)}
                                        required
                                        id="phone"
                                        label="Phone"
                                        fullWidth
                                        autoComplete="Phone"
                                        variant="standard"
                                        value={phone}
                                        type='number'
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField onChange={(e) => setEmail(e.target.value)}
                                        required
                                        id="email"
                                        label="Email"
                                        fullWidth
                                        autoComplete="Email"
                                        variant="standard"
                                        value={email}
                                    />
                                </Grid>
                                

                                <Grid item xs={12}>
                                    <Button onClick={save}>Submit</Button>
                                </Grid>
                            </Grid>
                        )}

                        {loader && (
                            <Grid item xs={12}>
                                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}><CircularProgress color="secondary" /></div>
                            </Grid>
                        )}

                    </CardContent>
                </Card>
            </Grid>
        </div>

    )
}

NewCompany.propTypes = {}
export default NewCompany