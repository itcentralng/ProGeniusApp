import { Grid, Typography, Box } from '@mui/material'
import React from 'react'
import Header from './header'
import ProposalCard from './proposalcard'
import { useLocation } from 'react-router-dom'
import Mascot from './mascot'
import Masonry from '@mui/lab/Masonry'


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
                <Grid item xs={12} sm={9} md={9} lg={9}><Typography variant='h3' sx={{color: '#3C0B79'}}>Proposals ({proposals.length})</Typography></Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br/></Grid>
            </Grid> 

            <Grid container >                   
                <Grid item xs={12} sm={3} md={3} lg={3}><Mascot/></Grid> 
                <Box  sx={{ width: 500, minHeight: 829 }} >
                    <Masonry columns={3}  >
                    {proposals.map((proposal:any)=>(
                        
                        // <Grid key={proposal?.id} item xs={12} sm={3} md={3} lg={3}>
                            <> 
                            <ProposalCard key={proposal?.id} id={proposal?.id} title={proposal?.offering} description={proposal?.description} client_email={proposal?.client.email} 
                            client_address={proposal?.client.address} client_updated_at={proposal?.client.updated_at} client_logo={proposal?.client.logo} 
                            client_name={proposal?.client.name} client_rep={proposal?.client.rep} client_role={proposal?.client.role} 
                            components_content={proposal?.components[4].content}
                            /> 
                            {console.log(`Id: ${proposal.id} ${proposal.client.name}`)}
                            </>
                        // </Grid>  
                                            
                    ))}
                    </Masonry>
                </Box>

            </Grid> 
            
            <Box sx={{p:4}}>                  
                <div style={{marginBottom: '2rem'}}></div>
            </Box>
            
                    
        {/* </Container> */}
        </div>  
  )
}

export default Proposals