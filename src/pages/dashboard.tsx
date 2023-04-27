import { Grid, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import CounterCard from '../components/countercard'
import Header from '../components/header'
import Loader from '../components/loader' 
import ProposalCard from '../components/proposalcard'
import Mascot from '../components/mascot'
 

function Dashboard() {
    const BASE_URL = `https://ai.proposal.itcentral.ng`; 
    const BEARER_TOKEN = localStorage.getItem('token');
    const [proposals, setProposals]= useState([]);
    const [clients, setClients]= useState([]);
    const [companies, setCompanies]= useState([]); 
     
    useEffect(()=>{
        fetchProposals();
        fetchClients();
        fetchCompanies(); 
    },[]); 

    const fetchProposals = async () => {
        console.log("fetching proposals...");
        try {
          const request = await fetch(`${BASE_URL}/proposals`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
          });
          const response = await request.json();
          if (request.ok) {
            setProposals(response); 
          }
        } catch (error) {
          console.log(error);
        }
    };

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

    return (
         
        <div style={{minHeight: '90vh'}}>
        {/* <Container maxWidth='sm'>  */}
             
            <Header/>

            <Grid sx={{p:4}} container>
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}><Typography variant='h3' sx={{color: '#3C0B79'}}>My Office</Typography></Grid>                
            </Grid>
            {/* <div style={{marginBottom: '2rem'}}></div> */}
            
            <Grid sx={{}} container >
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Mascot/>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <CounterCard  title={'Proposals'} count={proposals.length} items={proposals}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <CounterCard  title={'Clients'} count={clients.length} items={clients}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <CounterCard  title={'Companies'} count={companies.length} items={companies}/>
                </Grid>
            </Grid> 
                       
        </div>           
         
    )
}

Dashboard.propTypes = {}
export default Dashboard