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
         
        <div style={{minHeight: '93.8vh',background: '#000040',}}>
        {/* <Container maxWidth='sm'>  */}
             
            <Header/>

            <div id='eclipse1' style={{position: 'absolute',width: '500px',height: '554px', left: 'calc(50% - 550px/2 - 282px)', top: '-99px',
                background: 'rgba(138, 209, 210, 0.3)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', filter: 'blur(199.5px)'}}></div>
            <div id="eclipse2" style={{position: 'absolute',width: '500px', height: '536px', left: 'calc(50% - 550px/2 + 579px)', top: '286px',
                background: 'rgba(138, 209, 210, 0.7)', filter: 'blur(199.5px)'}}></div>

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