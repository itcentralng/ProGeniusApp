import { Grid, Typography, Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from './header'
import ProposalCard from './proposalcard'
import { useLocation } from 'react-router-dom'
import Mascot from './mascot'
import { AddBusinessTwoTone, AddBoxOutlined, AddCardRounded } from '@mui/icons-material';
import Masonry from '@mui/lab/Masonry';

function Proposals() {
    const location = useLocation();
    console.log(`Proposals Location: ${location.state}`)
    //const proposals:[] = location.state;

    const BASE_URL = `https://ai.proposal.itcentral.ng`; 
    const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODI1MDMyODYsImlhdCI6MTY4MjQxNzIwNCwic3ViIjoxLCJyb2xlIjpudWxsfQ.E3WlLnaTDkMGnif4bR08rJlOpxPBbhOf8DeN776J28M`;
    const [proposals, setProposals]= useState([]);

    useEffect(()=>{
        fetchProposals(); 
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

  return (
    <div style={{minHeight: '90vh'}}>
        {/* <Container maxWidth='sm'>  */}
             
            <Header/>

                         
            <Grid sx={{}} container>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}></Grid>  */}
                <Grid item xs={12} sm={9} md={9} lg={9} sx={{px:20, py: 2}}><Typography variant='h3' sx={{color: '#3C0B79'}}>Proposal Listings</Typography></Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br/></Grid>
            </Grid> 

            <Grid sx={{px:20}} spacing={1} container >                   
            <Masonry columns={3} spacing={2}>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}> */}
                    {/* <Box sx={{background:'#3C0B79',width: '20rem', height:'28rem', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border:'1px solid #fff'}}> */}
                    <Box sx={{background:'#3C0B79', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border:'1px solid #fff'}}>
                        <Typography variant='h4' sx={{p:2, textAlign: 'center', color: 'gold'}}>
                            My Proposals
                            <Button sx={{color:'#fff'}}><AddCardRounded sx={{fontSize:'2rem'}}/></Button>
                        </Typography>                        
                        <Mascot/>
                        <Typography variant='h5' sx={{p:2, textAlign: 'center'}}>Total: {proposals.length}</Typography>
                    </Box>                     
                {/* </Grid>  */}
 
                {proposals.map((proposal:any)=>(
                     
                    // <Grid key={proposal?.id} item xs={12} sm={3} md={3} lg={3}>
                        <>
                        <ProposalCard id={proposal?.id} title={proposal?.offering} description={proposal?.description} client_email={proposal?.client.email} 
                        client_address={proposal?.client.address} client_updated_at={proposal?.client.updated_at} client_logo={proposal?.client.logo} 
                        client_name={proposal?.client.name} client_rep={proposal?.client.rep} client_role={proposal?.client.role} 
                        components_content={proposal?.components[4]?.content || null}
                        /> 
                        {console.log(`Id: ${proposal.id} ${proposal.client.name}`)}
                        </>
                    // </Grid>  
                                           
                ))}

                {/*proposals.map((proposal:any)=>(
                     
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
                                           
                ))*/}                
            </Masonry>
            </Grid> 
            
            <Box sx={{p:4}}>                  
                <div style={{marginBottom: '2rem'}}></div>
            </Box>
            
                    
        {/* </Container> */}
        </div>  
  )
}

export default Proposals