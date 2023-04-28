import React, { useEffect, useState, useRef } from 'react'
import Header from './header'
import { useLocation } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material';
import Mascot from './mascot';
import proposals from './proposals';
import { AddBoxOutlined, RefreshOutlined, EditNote, PreviewTwoTone, SaveAs } from '@mui/icons-material';
import { Editor } from '@tinymce/tinymce-react';

function DocumentView() {
    const location = useLocation();
    const id = location.state;

    const BASE_URL = process.env.REACT_APP_API_URL; 
    const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODI1OTM1MTEsImlhdCI6MTY4MjUwNzExNCwic3ViIjoxLCJyb2xlIjpudWxsfQ.oCeMxP77br2_Lqs0E0OZRM4svSqBO0WgrsVue3bdi8s`;
    const TINY_MCE_TOKEN = process.env.REACT_APP_TINYMCE_KEY;//`a9ymejj5q3wrnf2wwt1zxnjedqxog4oc9b6zgs7boba7rbcy`;

    const [about, setAbout] = useState('-');
    const [problem, setProblem] = useState('-');
    const [solution, setSolution ] = useState('-');
    const [implementation, setImplementation ] = useState('-');
    const [cost, setCost ] = useState('-');
    const [letter, setLetter] = useState('-');

    const [client, setClient]:any = useState({});
    const [company, setCompany]:any = useState({});
    const [offering, setOfferring] = useState('-');
    const [companyAddress, setCompanyAddress]:any = useState([]);
    const [clientAddress, setClientAddress]:any = useState([]);


    const [loading, setLoading] = useState(false);
    const [aboutView, setAboutView] = useState(false);
    const [problemView, setProblemView] = useState(false);
    const [solutionView, setSolutionView ] = useState(false);
    const [implementationView, setImplementationView ] = useState(false);
    const [costView, setCostView ] = useState(false);
    const [letterView, setLetterView] = useState(false);
    const [preview, setPreview ] = useState(false);
    
    const aboutEditorRef:any = useRef(null);
    const logAbout = () => {
        if (aboutEditorRef.current) {
            console.log(`ABOUT CONTENT: ${aboutEditorRef.current.getContent()}`);
        }
    };

    const letterEditorRef:any = useRef(null);
    const logLetter = () => {
        if (letterEditorRef.current) {
            console.log(`LETTER CONTENT: ${letterEditorRef.current.getContent()}`);
        }
    };

    const problemEditorRef:any = useRef(null);
    const logProblem = () => {
        if (problemEditorRef.current) {
            console.log(`PROBLEM CONTENT: ${problemEditorRef.current.getContent()}`);
        }
    };

    const solutionEditorRef:any = useRef(null);
    const logSolution = () => {
        if (solutionEditorRef.current) {
            console.log(`SOLUTION CONTENT: ${solutionEditorRef.current.getContent()}`);
        }
    };

    const implementationEditorRef:any = useRef(null);
    const logImplementation = () => {
        if (implementationEditorRef.current) {
            console.log(`IMPLEMENTATION CONTENT: ${implementationEditorRef.current.getContent()}`);
        }
    };

    const costEditorRef:any = useRef(null);
    const logCost = () => {
        if (costEditorRef.current) {
            console.log(`COST CONTENT: ${costEditorRef.current.getContent()}`);
        }
    };

    const previewEditorRef:any = useRef(null);
    const logPreview = () => {
        if (previewEditorRef.current) {
            console.log(`PREVIEW CONTENT: ${previewEditorRef.current.getContent()}`);
        }
    };

    useEffect(()=>{
        fetchProposal(); 
    },[]); 

    const fetchProposal = async () => {
        setLoading(true);
        console.log("fetching proposal...");
        try {
          const request = await fetch(`${BASE_URL}/proposal/${id}`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
          });
          const response = await request.json();
        //   console.log(`Response: ${response.components[0].code}`);//about
        //   console.log(`Response: ${response.components[1].code}`);//problem
        //   console.log(`Response: ${response.components[2].code}`);//solution
        //   console.log(`Response: ${response.components[3].code}`);//implementation
        //   console.log(`Response: ${response.components[4].code}`);//cost
        //   console.log(`Response: ${response.components[5].code}`); //letter 
          setLoading(false);
          if (request.ok) {
            //setProposal(response);  
            response.components.map((component:any)=>{
                console.log(`Component: ${component.code}`);
                switch(component.code){
                    case 'about':
                        setAbout(component.content);
                        break;
                    case 'problem':
                        setProblem(component.content);
                        break;
                    case 'solution':
                        setSolution(component.content);
                        break;
                    case 'implementation':
                        setImplementation(component.content);
                        break;
                    case 'cost':
                        setCost(component.content);
                        break;
                    case 'letter':
                        setLetter(component.content); 
                        break;                        
                }
            });

            if(response.components.length == 0){
                setAbout('-');
                setProblem('-');
                setSolution('-');
                setImplementation('-');
                setCost('-');
                setLetter('-');
            }

            setClient(response.client);
            setCompany(response.company);
            setOfferring(response.offering);
            setCompanyAddress(response.company.address.split(','));
            setClientAddress(response.client.address.split(','));
            //setLoading(false);
          }
        } catch (error) {
            setLoading(false);
          console.log(error);
        }
    };

    const createComponentProposal = async (component:string) => {
        setLoading(true);
        console.log("fetching proposal...");
        try {
          const request = await fetch(`${BASE_URL}/proposal/${id}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
            body:JSON.stringify({
                component: component
            }),
          });
          const response = await request.json(); 
          setLoading(false);
          if (request.ok) {
            //setProposal(response);  
            response.components.map((comp:any)=>{ 
                switch(component){
                    case 'about':
                        setAbout(comp.content);
                        setAboutView(true);
                        break;
                    case 'problem':
                        setProblem(comp.content);
                        setProblemView(true);
                        break;
                    case 'solution':
                        setSolution(comp.content);
                        setSolutionView(true);
                        break;
                    case 'implementation':
                        setImplementation(comp.content);
                        setImplementationView(true);
                        break;
                    case 'cost':
                        setCost(comp.cost);
                        setCostView(true);
                        break;
                    case 'letter':
                        setLetter(comp.letter);
                        setLetterView(true);
                        break;                        
                }
            });

            if(response.components.length == 0){
                setAbout('-');
                setProblem('-');
                setSolution('-');
                setImplementation('-');
                setCost('-');
                setLetter('-');
            }
            //setLoading(false);
          }
        } catch (error) {
            setLoading(false);
          console.log(error);
        }
    };

    const improveProposal = async (component:string) => {
        setLoading(true);
        console.log("fetching proposal...");
        try {
            const url = cost == '-'?`${BASE_URL}/proposal/${id}`:`${BASE_URL}/proposal/improve/${id}`;
            const request = await fetch(`${url}`,{ //fetch(`${BASE_URL}/proposal/improve/${id}`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${BEARER_TOKEN}`,
                },
                body:JSON.stringify({
                    component: component
                }),
            });
            const response = await request.json(); 
            setLoading(false);
            if (request.ok) {
                //setProposal(response);  
                
                response.components.map((comp:any)=>{ 
                    if(component == comp.code && component == 'about'){                    
                        setAbout(comp.content);
                        setAboutView(true); 
                    }

                    if(component == comp.code && component == 'problem'){
                        setProblem(comp.content);
                        setProblemView(true);
                    }

                    if(component == comp.code && component == 'solution'){
                        setSolution(comp.content);
                        setSolutionView(true);
                    }

                    if(component == comp.code && component == 'implementation'){
                        setImplementation(comp.content);
                        setImplementationView(true);
                    }

                    if(component == comp.code && component == 'cost'){
                        setCost(comp.cost);
                        setCostView(true);
                    }
                    
                    if(component == comp.code && component == 'letter'){
                        setLetter(comp.letter);
                        setLetterView(true);
                    }
                    
                    /*switch(component){
                        case 'about':
                            setAbout(comp.content);
                            setAboutView(true);
                            break;
                        case 'problem':
                            setProblem(comp.content);
                            setProblemView(true);
                            break;
                        case 'solution':
                            setSolution(comp.content);
                            setSolutionView(true);
                            break;
                        case 'implementation':
                            setImplementation(comp.content);
                            setImplementationView(true);
                            break;
                        case 'cost':
                            setCost(comp.cost);
                            setCostView(true);
                            break;
                        case 'letter':
                            setLetter(comp.letter);
                            setLetterView(true);
                            break;                        
                    }*/
                });

                if(response.components.length == 0){
                    setAbout('-');
                    setProblem('-');
                    setSolution('-');
                    setImplementation('-');
                    setCost('-');
                    setLetter('-');
                }
                console.log('IN IMPROVEMENT')
                logPreview();
                //setLoading(false);
            }
        } catch (error) {
            setLoading(false);
          console.log(error);
        }
    };
    
    return (
        <div style={{ minHeight: '90vh' }}>
            <Header /> 

            <Grid sx={{}} container>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}></Grid>  */}
                <Grid item xs={12} sm={9} md={9} lg={9} sx={{ px: 20, py: 2 }}><Typography variant='h3' sx={{ color: '#3C0B79' }}>Proposal</Typography></Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br /></Grid>
            </Grid>

            <Grid sx={{ px: 20 }} spacing={1} container >
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Box sx={{ background: '#3C0B79', width: '20rem', height: '28rem', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff' }}>
                        <Typography variant='h4' sx={{ p: 2, color: 'gold' }}>
                            Proposal Outline
                        </Typography>

                        <Grid container spacing={1} sx={{ px: 3 }}>
                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>1. Covering Letter</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>setLetterView(!letterView)}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('letter')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>2. About Us</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>setAboutView(!aboutView)}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }}  onClick={()=>improveProposal('about')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>3. Problem</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>setProblemView(!problemView)}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('problem')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>4. Solution</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>setSolutionView(!solutionView)}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>5. Implementation</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>setImplementationView(!implementationView)}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('implementation')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>6. Cost</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>setCostView(!costView)}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('cost')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>Preview</Button></Grid>
                            <Grid item xs={6} sm={2} md={2} lg={2}><Button sx={{ color: '#fff' }} onClick={()=>setPreview(!preview)}><PreviewTwoTone /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }}><SaveAs /></Button></Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Box sx={{ p:2, textAlign: 'justify', background: '#EEF2F2', minHeight: '28rem', boxShadow: '0 2px 9px 0 #888888', color: 'black', border: '1px solid #fff' }}>
                        {loading && "Loading..."}
                        {!loading && !aboutView && !letterView && !problemView && !solutionView && !implementationView  && !costView && !preview 
                        && <><Mascot/> <Typography variant='h6' sx={{ p: 2, }}>Conjure Something...Use the proposal outline to start.</Typography></>}
                        {loading && about && aboutView &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            About Us
                            </Typography>
                            <Editor onEditorChange={()=>logAbout}  
                                onInit={(evt, editor) => aboutEditorRef.current = editor} 
                                initialValue={"<p>"+about+"</p>"} 
                                apiKey={TINY_MCE_TOKEN}
                                init={{
                                height: 500,
                                menubar: false,
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
                            {/* <button onClick={logAbout}>Log editor content</button> */}
                            </>
                        )} 

                        {!loading && letter && letterView &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            Covering Letter
                            </Typography>
                            <Editor onEditorChange={()=>logLetter} 
                                onInit={(evt, editor) => letterEditorRef.current = editor} 
                                initialValue={"<p>"+letter+"</p>"} 
                                apiKey={TINY_MCE_TOKEN} 
                                init={{
                                height: 500,
                                menubar: false,
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
                            {/* <button onClick={logLetter}>Log editor content</button> */}
                            </>
                        )}


                        {!loading && problem && problemView &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            Problem Statement
                            </Typography>
                            <Editor onEditorChange={()=>logProblem} 
                                onInit={(evt, editor) => problemEditorRef.current = editor} 
                                initialValue={"<p>"+problem+"</p>"} 
                                apiKey={TINY_MCE_TOKEN} 
                                init={{
                                height: 500,
                                menubar: false,
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
                            {/* <button onClick={logProblem}>Log editor content</button> */}
                            </>
                        )}

                        {!loading && solution && solutionView &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            Solution
                            </Typography>
                            <Editor onEditorChange={()=>logSolution} 
                                onInit={(evt, editor) => solutionEditorRef.current = editor} 
                                initialValue={"<p>"+solution+"</p>"} 
                                apiKey={TINY_MCE_TOKEN} 
                                init={{
                                height: 500,
                                menubar: false,
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
                            {/* <button onClick={logSolution}>Log editor content</button> */}
                            </>
                        )}        

                        {!loading && implementation && implementationView &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            Implementation
                            </Typography>
                            <Editor onEditorChange={()=>logImplementation} 
                                onInit={(evt, editor) => implementationEditorRef.current = editor} 
                                initialValue={"<p>"+implementation+"</p>"} 
                                apiKey={TINY_MCE_TOKEN}
                                init={{
                                height: 500,
                                menubar: false,
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
                            {/* <button onClick={logImplementation}>Log editor content</button> */}
                            </>
                        )}  
                        
                        {!loading && cost && costView &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            Costing
                            </Typography>
                            <Editor onEditorChange={()=>logCost} 
                                onInit={(evt, editor) => costEditorRef.current = editor} 
                                initialValue={"<p>"+cost+"</p>"} 
                                apiKey={TINY_MCE_TOKEN}
                                init={{
                                height: 500,
                                menubar: false,
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
                            {/* <button onClick={logCost}>Log editor content</button> */}
                            </>
                        )}  

                         
                        {!loading && preview &&
                        (                            
                            <>
                            <Typography variant='h4' sx={{ p: 2, }}>
                            Proposal Preview
                            </Typography>
                            <Editor onEditorChange={()=>logPreview} 
                                onInit={(evt, editor) => previewEditorRef.current = editor} 
                                initialValue=
                                {
                                    
                                    "<p style='text-align:right'>"
                                    +company.name+", <br/>"
                                    +companyAddress[0]+", <br/>"
                                    +companyAddress[1]+", <br/>"
                                    +companyAddress[2]+", <br/>"
                                    +company.email+", <br/>"
                                    +company.phone+", <br/>"
                                    +"</p>"+

                                    "<p align='center'><img src='"+company.logo+"' width=100 height=200/></p>"+

                                    "<p style='text-align:left'>"
                                    +client.role+", <br/>"
                                    +client.name+", <br/>"
                                    +clientAddress[0]+", <br/>"
                                    +clientAddress[1]+", <br/>"
                                    +clientAddress[2]+", <br/>"
                                    +client.email+", <br/>"
                                    +client.phone+", <br/>"
                                    +"</p>"+

                                    "<h4 style='text-decoration: underline'>"+offering?.toUpperCase()+"</h4>"+

                                    "<p>"+letter+"</p><br/>"+
                                    "<p style='padding-left: 80%'> Yours Sincerely,<br/> "+company.rep+"<br/>"+company.role+"<br/>"+"</p><br/>"+
                                    "<!-- pagebreak -->" +

                                    "<h4 style='text-decoration: underline'>About Us</h4>"+
                                    "<p>"+about+"</p><br/>"+
                                    "<!-- pagebreak -->" +

                                    "<h4 style='text-decoration: underline'>Problem Statement</h4>"+
                                    "<p>"+problem+"</p><br/>"+
                                    "<!-- pagebreak -->" +

                                    "<h4 style='text-decoration: underline'>Solution</h4>"+
                                    "<p>"+solution+"</p><br/>"+
                                    "<!-- pagebreak -->" +

                                    "<h4 style='text-decoration: underline'>Implementation</h4>"+
                                    "<p>"+implementation+"</p><br/>"+
                                    "<!-- pagebreak -->" +

                                    "<h4 style='text-decoration: underline'>Costing</h4>"+
                                    "<p>"+cost+"</p><br/>"
                                    

                                }
                                apiKey={TINY_MCE_TOKEN} 
                                init={{
                                height: 500,
                                menubar: false,
                                plugins: 
                                    'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount pagebreak'
                                ,
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'pagebreak | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            {/* <button onClick={logCost}>Log editor content</button> */}
                            </>
                        )}     


                    </Box>
                </Grid>


            </Grid>
        </div>
    )
}

export default DocumentView