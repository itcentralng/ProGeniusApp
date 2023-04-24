import { Grid, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import CounterCard from '../components/countercard'
import Header from '../components/header'
import Loader from '../components/loader'
import mascot from '../components/images/[removal.ai]mascot.png'
import ProposalCard from '../components/proposalcard'

 
function Dashboard() {
    const BASE_URL = `https://ai.proposal.itcentral.ng`; 
    const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODI0MTQ1MjMsImlhdCI6MTY4MjMzMjUzMCwic3ViIjoxLCJyb2xlIjpudWxsfQ.cpeR8ZMElrsqGa55ULHJuP-Eu7NrtMeuIJd2SYatTa0`;
    const [proposals, setProposals ]= useState([]);
    const [clients, setClients ]= useState([]);
    const [companies, setCompanies ]= useState([]);

    useEffect(()=>{
        fetchProposals();
        fetchClients();
        fetchCompanies(); 
    },[]);//[proposals, companies, clients]); 
    /*useEffect(()=>{
        fetchProposals();
    },[proposals]);
    useEffect(()=>{
        fetchClients();
    },[clients]);
    useEffect(()=>{
        fetchCompanies();
    },[companies]);*/

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
                    <img src={`${mascot}`}   />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <CounterCard  title={'Proposals'} count={proposals.length}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <CounterCard  title={'Clients'} count={clients.length}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <CounterCard  title={'Companies'} count={companies.length}/>
                </Grid>
            </Grid> 
                       
                              
            {/* <div style={{marginBottom: '2rem'}}></div> */}
             
            
            <Grid sx={{}} container>
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid> 
                <Grid item xs={12} sm={9} md={9} lg={9}><Typography variant='h3' sx={{color: '#3C0B79'}}>Proposals ({proposals.length})</Typography></Grid>
            </Grid> 

            <Grid sx={{}} container >                   
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid> 

                {proposals.map((proposal:any)=>(
                     
                    <Grid key={proposal?.id} item xs={12} sm={3} md={3} lg={3}>
                        <>
                        <ProposalCard id={proposal?.id} title={proposal?.offering} description={proposal?.description} client_email={proposal?.client.email} 
                        client_address={proposal?.client.address} client_updated_at={proposal?.client.updated_at} client_logo={proposal?.client.logo} 
                        client_name={proposal?.client.name} client_rep={proposal?.client.rep} client_role={proposal?.client.role} 
                        components_content={proposal?.components[4].content}
                        /> 
                        {console.log(`Id: ${proposal.id} ${proposal.client.name}`)}
                        </>
                    </Grid>  
                                           
                ))}
                

            </Grid> 
            
            <Box sx={{p:4}}>                  
                <div style={{marginBottom: '2rem'}}></div>
            </Box>  
                    
        {/* </Container> */}
        </div>
    )
}

Dashboard.propTypes = {}
export default Dashboard