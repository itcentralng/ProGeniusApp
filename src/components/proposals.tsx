import { Grid, Typography, Box, Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Header from './header'
import ProposalCard from './proposalcard'
import { useLocation, useNavigate } from 'react-router-dom'
import Mascot from './mascot'
import { AddBusinessTwoTone, AddBoxOutlined, AddCardRounded } from '@mui/icons-material';
import Masonry from '@mui/lab/Masonry';

import debounce from 'lodash/debounce'; //yarn add lodash-es && yarn add -D @types/lodash-es

function Proposals() {
    const location = useLocation();
    console.log(`Proposals Location: ${location.state}`)
    //const proposals:[] = location.state;

    const navigate = useNavigate();

    const [width, setWidth] = useState(window.innerWidth);
    const containerRef = useRef<HTMLDivElement>(null);

    /*useEffect(() => {
        const handleResize = debounce(() => {
        setWidth(window.innerWidth);
        }, 500);

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [width]); */
    useEffect(() => {
        const resizeObserver = new ResizeObserver(
          debounce((entries) => {
            const { width } = entries[0].contentRect;
            setWidth(width);
          }, 500)
        );
        if (containerRef.current) {
          resizeObserver.observe(containerRef.current);
        }
    
        return () => {
          if (containerRef.current) {
            resizeObserver.unobserve(containerRef.current);
          }
        };
      }, []);
    

    const BASE_URL = process.env.REACT_APP_API_URL; 
    const BEARER_TOKEN = localStorage.getItem('token');
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
    <div style={{minHeight: '93.8vh' }}>
        {/* <Container maxWidth='sm'>  */}
             
            <Header/>

            <div id='eclipse1' style={{position: 'absolute',width: '500px',height: '554px', left: 'calc(50% - 550px/2 - 282px)', top: '-99px',
                background: 'rgba(138, 209, 210, 0.3)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', filter: 'blur(199.5px)'}}></div>
            <div id="eclipse2" style={{position: 'absolute',width: '500px', height: '536px', left: 'calc(50% - 550px/2 + 579px)', top: '286px',
                background: 'rgba(138, 209, 210, 0.7)', filter: 'blur(199.5px)'}}></div>
                         
            <Grid sx={{}} container>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}></Grid>  */}
                <Grid item xs={12} sm={9} md={9} lg={9} sx={{px:20, py: 2}}><Typography variant='h3' sx={{color: '#000040'}}>Proposal Listings</Typography></Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br/></Grid>
            </Grid> 

            <Grid sx={{px:20}} spacing={1} container >                   
            <Masonry columns={3} spacing={2}>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}> */}
                    {/* <Box sx={{background:'#3C0B79',width: '20rem', height:'28rem', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border:'1px solid #fff'}}> */}
                    <Box sx={{background:'#000040', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border:'1px solid #fff'}}>
                        <Typography variant='h4' sx={{p:2, textAlign: 'center', color: 'gold'}}>
                            My Proposals
                            <Button sx={{color:'#fff'}}   onClick={()=>navigate('/document/new')}><AddCardRounded sx={{fontSize:'2rem'}}/></Button>
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