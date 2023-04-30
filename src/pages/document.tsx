import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/header'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material';
import Mascot from '../components/mascot';
import proposals from '../components/proposals';
import { AddBoxOutlined, RefreshOutlined, EditNote,ViewAgenda, PreviewTwoTone, SaveAs, ImportExportOutlined, EditNoteRounded } from '@mui/icons-material';
import { Editor } from '@tinymce/tinymce-react';
//import saveAs from 'file-saver';

import templateDefault from '../components/images/default_template.png';
import templateOne from '../components/images/template_one.png';

function DocumentView() {
    const location = useLocation();
    const id = location.state;

    const navigate = useNavigate();

    const BASE_URL = process.env.REACT_APP_API_URL;
    const BEARER_TOKEN = localStorage.getItem('token');
    const TINY_MCE_TOKEN = process.env.REACT_APP_TINYMCE_KEY

    const [proposal, setProposal] = useState({id:0, components:[{id:0, index:0, code:'', name:'', content:''}]});
    const [component, setComponent] = useState({id:0, index:0, code:'', name:'', content:''});
    const [loading, setLoading] = useState(false);
    const [preview, setPreview ] = useState(false);
    
    const defaultcomponents = [
        {id:0, index:1, code:'about', name:'About', content:''},
        {id:0, index:2, code:'problem', name:'Problem', content:''},
        {id:0, index:3, code:'solution', name:'Solution', content:''},
        {id:0, index:4, code:'implementation', name:'Implementation', content:''},
        {id:0, index:5, code:'cost', name:'Cost', content:''},
        {id:0, index:6, code:'letter', name:'Letter', content:''},
    ]
    
    useEffect(()=>{
        fetchProposal(); 
    },[]);

    const generatePreview = ()=>{
        setPreview(true);

    }

    const gotoPreview = (templateId: number)=>{
        // take user to the preview page on a new tab and show the page
        // with the selected styles.
        navigate('/template',
        { 
            state : {
                template: templateId,
                proposal
            }
        });
    }


    const handleEditorChange = (content: string)=>{
        setComponent(prevState => ({
            ...prevState,
            content: content
        }));
        updateComponent()
    }

    const getCurrentComponent = (code: string)=>{
        setPreview(false);
        let c = proposal.components.find(comp=>comp.code==code)
        if (c){
            setComponent({id:c.id, index:c.index, code:c.code, name:c.name, content:c.content})
        }
    }
    const generateComponent = async (index: number, code: string)=>{
        setLoading(true);
        try {
            
            const request = await fetch(`${BASE_URL}/proposal/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                     authorization: `bearer ${BEARER_TOKEN}`,
                },
                body: JSON.stringify({component:code, index:index}),
            });
            const response = await request.json();
            if (request.ok) {
                setProposal(response);
                getCurrentComponent(component.code)
                setLoading(false);
            }
        } catch (error) {
            // alert(`Error: ${error}`);
            setLoading(false);
            console.log(error);
        }
    }

    

    const updateComponent = async () => {
        // console.log(component.content);
        try {
          await fetch(`${BASE_URL}/component/${component.id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
            body: JSON.stringify({content:component.content, index:component.index}),
          });

        } catch (error) {
          console.log(error);
        }
    };
    
    const fetchProposal = async () => {
        setLoading(true);
        try {
          const request = await fetch(`${BASE_URL}/proposal/${id}`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
          });
          const response = await request.json();
          setLoading(false);
          if (request.ok) {
            setProposal(response);
            }

        } catch (error) {
            setLoading(false);
          console.log(error);
        }
    };
    
    return (
        <div style={{ minHeight: '93.8vh' }}>
            <Header /> 

            <Grid sx={{}} container>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}></Grid>  */}
                <Grid item xs={12} sm={9} md={9} lg={9} sx={{ px: 20, py: 2 }}>
                    <Typography variant='h3' sx={{ color: '#3C0B79' }}>
                    <Button sx={{ background: '#000040', padding: '1rem',boxShadow: '0 2px 9px 0 #888888', color: '#fff' }}
                        onClick={() => navigate('/proposals')}>
                        <ViewAgenda />
                        Back
                    </Button>
                        Proposal        
                    </Typography>                 
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br /></Grid>
            </Grid>

            <Grid sx={{ px: 20 }} spacing={1} container >
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Box sx={{ background: '#000040', width: '20rem', height: '28rem', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff' }}>
                        <Typography variant='h4' sx={{ p: 2, color: 'gold' }}>
                            Proposal Outline
                        </Typography>

                        <Grid container spacing={1} sx={{ px: 3 }}>
                            {
                                defaultcomponents.map((co, i)=>
                                    <>
                                    <Grid key={i+1} item xs={9} sm={10} md={10} lg={10}><Button sx={{ color: '#fff' }} onClick={()=>getCurrentComponent(co.code)}>{co.index} {co.name}</Button></Grid>
                                    {/* <Grid key={i+2} item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }}></Button></Grid> */}
                                    <Grid key={i+3} item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>generateComponent(co.index, co.code)}><RefreshOutlined /></Button></Grid>
                                    </>
                                    )
                                }
                                <Grid item xs={9} sm={10} md={10} lg={10}><Button sx={{ color: '#fff' }} onClick={()=>generatePreview()}>Preview</Button></Grid>
                                {/* <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }}></Button></Grid> */}
                                <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>generatePreview()}><PreviewTwoTone/></Button></Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Box sx={{ p:2, textAlign: 'justify', background: '#EEF2F2', minHeight: '28rem', boxShadow: '0 2px 9px 0 #888888', color: 'black', border: '1px solid #fff' }}>
                        {/* Show Loading Indicator */}
                        {loading && "Loading..."}

                        {/* Show Macot */}
                        {!loading && !component.code && !preview
                        && <><Mascot/> <Typography variant='h6' sx={{ p: 2, }}>Select a component to start.</Typography></>}

                        {/* Show Component */}
                        {!loading && component.code && !preview &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            {component.name}
                            </Typography>
                            <Editor onEditorChange={handleEditorChange}  
                                value={component.content}
                                apiKey={TINY_MCE_TOKEN}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    branding: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            </>
                        )} 
                        {/* Show Preview */}
                        {!loading && preview &&
                        <>
                        <Grid container>
                            <Grid item xs={12} md={12}><Typography variant='h4'>Select template</Typography></Grid> 
                            {/* <Grid item xs={12} md={4}>
                                <Button onClick={()=>{gotoPreview(1)}} >
                                    <img src={`${templateDefault}`}  alt="Template Default" 
                                    style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff'}}/>
                                </Button>
                            </Grid> */}
                            <Grid item xs={12} md={4}>
                            <Button onClick={()=>{gotoPreview(2)}} >
                                    <img src={`${templateOne}`}  alt="Template One"  
                                    style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff'}}/>   
                                </Button>
                                
                            </Grid>                                  
                            <Grid item xs={12} md={4}>
                                <div style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', background: '#fff', border: '1px solid #fff'}}>
                                    <Typography variant='h5' sx={{p:5, color: '#000'}}>Template 2
                                    <Typography>Coming soon...</Typography></Typography>
                                </div>
                            </Grid>                                 
                            <Grid item xs={12} md={4}>
                                <div style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', background: '#fff', border: '1px solid #fff'}}>
                                    <Typography variant='h5' sx={{p:5, color: '#000'}}>Template 3
                                    <Typography>Coming soon...</Typography></Typography>
                                </div>
                            </Grid>                                 
                        </Grid>
                        </>
                        }
                    </Box>
                </Grid>


            </Grid>
        </div>
    )
}

export default DocumentView