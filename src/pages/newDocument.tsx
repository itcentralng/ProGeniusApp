import { Button, Card, CardContent, CardHeader, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';

function NewDocument() {
    const [client, setClient] = useState('');
    const [clients, setClients]:any = useState([]);

    const [company, setCompany ] = useState('');
    const [ companies, setCompanies ]:any = useState([]);
    
    const [description, setDescription] = useState('');
    const [offering, setOfferring] = useState('');

    const BASE_URL = process.env.REACT_APP_API_URL; 
    const BEARER_TOKEN = localStorage.getItem('token');
     
    const navigate = useNavigate();

    useEffect(()=>{
        fetchClients();
        fetchCompanies(); 
    },[]); 

    const fetchClients = async () => {
        console.log("fetching clients...");
        try {
          const request = await fetch(`${BASE_URL}/clients`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
          });
          const response = await request.json();
          if (request.ok) {
            setClients(response); 
          }
        } catch (error) {
          console.log(error);
        }
    };

    const fetchCompanies = async () => {
        console.log("fetching companies...");
        try {
          const request = await fetch(`${BASE_URL}/companies`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
          });
          const response = await request.json();
          if (request.ok) {
            setCompanies(response); 
          }
        } catch (error) {
          console.log(error);
        }
    };

    const handleClientChange = (event: SelectChangeEvent) => {
        setClient(event.target.value);
    };

    const handleCompanyChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value);
    };

    const [loader, setLoader] = useState(false);
    const saveDocument = async()=>{ 
        setLoader(true);
        try {
            const request = await fetch(`${BASE_URL}/proposal`, {
            method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${BEARER_TOKEN}`,
                },
                body:JSON.stringify({
                    company_id: company,
                    client_id: client,
                    offering,
                    description
                }),
            });
            const response = await request.json();
            setLoader(false);
            if (request.ok) {
                navigate(`/document`, { state: response?.id })
            }
          } catch (error) {
            setLoader(false); 
            console.log(error);
          }
    }
    
    return (
        <div style={{ minHeight: '90vh' }}>
            
            <Header />

            <Grid sx={{ p: 12 }} container spacing={1}>
            <Card>
                 {/* <Typography variant='h3' sx={{ color: '#3C0B79',p:8, py:3, borderBottom: '1px solid black' }}>New Proposal</Typography> */}
                <Typography variant='h3' sx={{ background: '#000040', color: '#fff', opacity: .7,p:8, py:3, borderBottom: '1px solid black' }}>New Proposal</Typography>
                <CardContent>

                {!loader && (
                <Grid sx={{ p: 6 }} container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 640 }}>
                            <InputLabel id="demo-simple-select-standard-label">Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={company}
                                onChange={handleCompanyChange}
                                label="Company"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {companies.length > 0 && companies.map((company:any)=>(<MenuItem value={company.id}>{company.name}</MenuItem>))}                             
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 640 }}>
                            <InputLabel id="demo-simple-select-standard-label">Client</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={client}
                                onChange={handleClientChange}
                                label="Client"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {clients.length > 0 && clients.map((client:any)=>(<MenuItem value={client.id}>{client.name}</MenuItem>))} 
                            </Select>
                        </FormControl>
                    </Grid>


                    
                    <Grid item xs={12} md={12}>
                        <TextField onChange={(e)=>setOfferring(e.target.value)}
                            required
                            id="offering"
                            label="Title"
                            fullWidth
                            autoComplete="Title"
                            variant="standard"
                            value={offering}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField onChange={(e)=>setDescription(e.target.value)}
                            required
                            id="description"
                            label="Description"
                            fullWidth
                            autoComplete="Description"
                            variant="standard" 
                            value={description}
                        />
                    </Grid>                
                    
                    
                    <Grid item xs={12}>
                        <Button onClick={saveDocument}>Submit</Button> 
                    </Grid>
                </Grid>
                )}

                {loader && (
                <Grid item xs={12}>
                    <div style={{display:'flex', alignContent: 'center', justifyContent: 'center'}}><CircularProgress  color="secondary" /></div>
                </Grid>
                )}

                </CardContent>
            </Card>
            </Grid>

            

        </div>
    )
}

export default NewDocument;