import { Grid, Typography, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from './header'
import ProposalCard from './proposalcard'
import { useLocation } from 'react-router-dom'
import Mascot from './mascot'


function Proposals() {
    const location = useLocation();
    console.log(`Proposals Location: ${location.state}`)
    const proposals:[] = location.state;

  return (
    <div style={{minHeight: '90vh'}}>
        {/* <Container maxWidth='sm'>  */}
             
            <Header/>

                         
            <Grid sx={{}} container>
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid> 
                <Grid item xs={12} sm={9} md={9} lg={9}><Typography variant='h3' sx={{color: '#3C0B79'}}>Proposal Listings</Typography></Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br/></Grid>
            </Grid> 

            <Grid sx={{p:2}} spacing={2} container >                   
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Box sx={{background:'#3C0B79',width: '20rem', height:'28rem', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border:'1px solid #fff'}}>
                        <Typography variant='h4' sx={{p:2, textAlign: 'center', color: 'gold'}}>My Proposals</Typography>                        
                        <Mascot/>
                        <Typography variant='h5' sx={{p:2, textAlign: 'center'}}>Total: {proposals.length}</Typography>
                    </Box>                     
                </Grid> 
 
                {proposals.map((proposal:any)=>(
                     
                    <Grid key={proposal?.id} item xs={12} sm={3} md={3} lg={3}>
                        <>
                        <ProposalCard id={proposal?.id} title={proposal?.offering} description={proposal?.description} client_email={proposal?.client.email} 
                        client_address={proposal?.client.address} client_updated_at={proposal?.client.updated_at} client_logo={proposal?.client.logo} 
                        client_name={proposal?.client.name} client_rep={proposal?.client.rep} client_role={proposal?.client.role} 
                        components_content={proposal?.components[4]?.content || null}
                        /> 
                        {console.log(`Id: ${proposal.id} ${proposal.client.name}`)}
                        </>
                    </Grid>  
                                           
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

            </Grid> 
            
            <Box sx={{p:4}}>                  
                <div style={{marginBottom: '2rem'}}></div>
            </Box>
            
                    
        {/* </Container> */}
        </div>  
  )
}

export default Proposals