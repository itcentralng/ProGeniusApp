import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/header'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material';
import Mascot from '../components/mascot';
import proposals from '../components/proposals';
import { AddBoxOutlined, RefreshOutlined, EditNote, PreviewTwoTone, SaveAs, ImportExportOutlined } from '@mui/icons-material';
import { Editor } from '@tinymce/tinymce-react';
//import saveAs from 'file-saver';

import templateDefault from '../components/images/default_template.png';
import templateOne from '../components/images/template_one.png';

function DocumentView() {
    const location = useLocation();
    const id = location.state;

    const navigate = useNavigate();

    const BASE_URL = `https://ai.proposal.itcentral.ng`; 
    const BEARER_TOKEN = localStorage.getItem('token');
    const TINY_MCE_TOKEN = `lp7iu5azuh7zvuobj0azvekuu5orfmemlhdlgc65mjeobzw2`;//`a9ymejj5q3wrnf2wwt1zxnjedqxog4oc9b6zgs7boba7rbcy`;

    const [about, setAbout] = useState('-');
    const [problem, setProblem] = useState('-');
    const [solution, setSolution ] = useState('-');
    const [implementation, setImplementation ] = useState('-');
    const [cost, setCost ] = useState('-');
    const [letter, setLetter] = useState('-');

    const [aboutId, setAboutId] = useState(0);
    const [problemId, setProblemId] = useState(0);
    const [solutionId, setSolutionId ] = useState(0);
    const [implementationId, setImplementationId ] = useState(0);
    const [costId, setCostId ] = useState(0);
    const [letterId, setLetterId] = useState(0);

    const [client, setClient]:any = useState({});
    const [company, setCompany]:any = useState({});
    const [offering, setOfferring] = useState('-');
    const [description, setDescription] = useState('');
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
            improveWriting('about',aboutEditorRef.current.getContent(), aboutId);
        }
    };

    const letterEditorRef:any = useRef(null);
    const logLetter = () => {
        if (letterEditorRef.current) {
            console.log(`LETTER CONTENT: ${letterEditorRef.current.getContent()}`);
            setLetter(letterEditorRef.current.getContent());
            improveWriting('letter', letter, letterId);
        }
    };

    const problemEditorRef:any = useRef(null);
    const logProblem = () => {
        if (problemEditorRef.current) {
            console.log(`PROBLEM CONTENT: ${problemEditorRef.current.getContent()}`);
            setProblem(problemEditorRef.current.getContent());
            improveWriting('problem',problem, problemId);
        }
    };

    const solutionEditorRef:any = useRef(null);
    const logSolution = () => {
        if (solutionEditorRef.current) {
            console.log(`SOLUTION CONTENT: ${solutionEditorRef.current.getContent()}`);
            setSolution(solutionEditorRef.current.getContent())
            improveWriting('solution',solution, solutionId);
        }
    };

    const implementationEditorRef:any = useRef(null);
    const logImplementation = () => {
        if (implementationEditorRef.current) {
            console.log(`IMPLEMENTATION CONTENT: ${implementationEditorRef.current.getContent()}`);
            setImplementation(implementationEditorRef.current.getContent())
            improveWriting('implementation',implementation, implementationId);
        }
    };

    const costEditorRef:any = useRef(null);
    const logCost = () => {
        if (costEditorRef.current) {
            console.log(`COST CONTENT: ${costEditorRef.current.getContent()}`);
            setCost(costEditorRef.current.getContent())
            improveWriting('cost',cost, costId);
        }
    };

    const previewEditorRef:any = useRef(null);
    const logPreview = () => {
        if (previewEditorRef.current) {
            console.log(`PREVIEW CONTENT: ${previewEditorRef.current.getContent()}`);
        }
    };

    const previewEditor2Ref:any = useRef(null);
    const log2Preview = () => {
        if (previewEditor2Ref.current) {
            console.log(`PREVIEW CONTENT: ${previewEditor2Ref.current.getContent()}`);
        }
    };

    const [templateDefaultView, setTemplateDefaultView] = useState(true);
    const [templateOneView, setTemplateOneView] = useState(false);

    const toggleTemplateView = (id:number)=>{
        if(id == 0){
            setTemplateDefaultView(true);
            setTemplateOneView(false);
        }
        if(id == 1){
            setTemplateDefaultView(false);
            setTemplateOneView(true);
        }
    }

    const toggleSectionView = (component: string)=>{
         
            if(component == 'about'){    
                setAboutView(true);

                setProblemView(false);
                setSolutionView(false);
                setImplementationView(false);
                setCostView(false);
                setLetterView(false);

                setPreview(false);
            }

            if(component == 'problem'){ 
                setProblemView(true);
                
                setAboutView(false);
                setSolutionView(false);
                setImplementationView(false);
                setCostView(false);
                setLetterView(false);

                setPreview(false);
            }

            if(component  == 'solution'){ 
                setSolutionView(true);

                setProblemView(false);                        
                setAboutView(false); 
                setImplementationView(false);
                setCostView(false);
                setLetterView(false);

                setPreview(false);
            }

            if(component == 'implementation'){ 
                setImplementationView(true);

                setProblemView(false);                        
                setAboutView(false);
                setSolutionView(false); 
                setCostView(false);
                setLetterView(false);

                setPreview(false);
            }

            if(component  == 'cost'){ 
                console.log(`COST: ${cost}`)
                setCostView(true);

                setProblemView(false);                        
                setAboutView(false);
                setSolutionView(false);
                setImplementationView(false); 
                setLetterView(false);

                setPreview(false);
            }
            
            if(component  == 'letter'){ 
                console.log(`LETTER: ${letter}`);
                setLetterView(true);

                setProblemView(false);                        
                setAboutView(false);
                setSolutionView(false);
                setImplementationView(false);
                setCostView(false); 

                setPreview(false);
            }

            if(component  == 'preview'){ 
                console.log(`LETTER: ${letter}`);
                setLetterView(false);

                setProblemView(false);                        
                setAboutView(false);
                setSolutionView(false);
                setImplementationView(false);
                setCostView(false); 
                setPreview(true);
            }
            
             
    }

    /*const handleExport = ()=>{
        const editor = previewEditorRef.current.editor; 

        if(editor){
            const content = editor.getContent(); 
            editor.execCommand('mceRemoveEditor', false, editor.id);
            editor.remove();

            const blob = new Blob([content], { type: 'text/html'});
            saveAs(blob, 'print.html');    
        }  
    }*/

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
                        setAboutId(component.id);
                        break;
                    case 'problem':
                        setProblem(component.content);
                        setProblemId(component.id);
                        break;
                    case 'solution':
                        setSolution(component.content);
                        setSolutionId(component.id);
                        break;
                    case 'implementation':
                        setImplementation(component.content);
                        setImplementationId(component.id);
                        break;
                    case 'cost':
                        setCost(component.content);
                        setCostId(component.id);
                        break;
                    case 'letter':
                        setLetter(component.content); 
                        setLetterId(component.id);
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
            setDescription(response.description);
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

        let index = 1;
        switch(component){
            case 'letter':
                index = 1;
                break;
            case 'about':
                index = 2;
            case 'problem':
                index = 3;
            case 'solution':
                index = 4;
            case 'implementation':
                index = 5;
            case 'cost':
                index = 6;
        }

        try {
            //const url = cost == '-'?`${BASE_URL}/proposal/${id}`:`${BASE_URL}/proposal/improve/${id}`;
            const request = await fetch(`${BASE_URL}/proposal/${id}`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${BEARER_TOKEN}`,
                },
                body:JSON.stringify({
                    component: component,
                    index: index
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

                        setProblemView(false);
                        setSolutionView(false);
                        setImplementationView(false);
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'problem'){
                        setProblem(comp.content);
                        setProblemView(true);
                        
                        setAboutView(false);
                        setSolutionView(false);
                        setImplementationView(false);
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'solution'){
                        setSolution(comp.content);
                        setSolutionView(true);

                        setProblemView(false);                        
                        setAboutView(false); 
                        setImplementationView(false);
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'implementation'){
                        setImplementation(comp.content);
                        setImplementationView(true);

                        setProblemView(false);                        
                        setAboutView(false);
                        setSolutionView(false); 
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'cost'){
                        setCost(comp.cost);
                        console.log(`COST: ${cost}`)
                        setCostView(true);

                        setProblemView(false);                        
                        setAboutView(false);
                        setSolutionView(false);
                        setImplementationView(false); 
                        setLetterView(false);
                    }
                    
                    if(component == comp.code && component == 'letter'){
                        setLetter(comp.letter);
                        console.log(`LETTER: ${letter}`);
                        setLetterView(true);

                        setProblemView(false);                        
                        setAboutView(false);
                        setSolutionView(false);
                        setImplementationView(false);
                        setCostView(false); 
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

    const improveWriting = async (component:string, content:string, id: number) => {
        setLoading(true);
        console.log("improving proposal...");
         
        try {
            //const url = cost == '-'?`${BASE_URL}/proposal/${id}`:`${BASE_URL}/proposal/improve/${id}`;
            const request = await fetch(`${BASE_URL}/component/${id}`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${BEARER_TOKEN}`,
                },
                body:JSON.stringify({
                    content: content, 
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

                        setProblemView(false);
                        setSolutionView(false);
                        setImplementationView(false);
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'problem'){
                        setProblem(comp.content);
                        setProblemView(true);
                        
                        setAboutView(false);
                        setSolutionView(false);
                        setImplementationView(false);
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'solution'){
                        setSolution(comp.content);
                        setSolutionView(true);

                        setProblemView(false);                        
                        setAboutView(false); 
                        setImplementationView(false);
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'implementation'){
                        setImplementation(comp.content);
                        setImplementationView(true);

                        setProblemView(false);                        
                        setAboutView(false);
                        setSolutionView(false); 
                        setCostView(false);
                        setLetterView(false);
                    }

                    if(component == comp.code && component == 'cost'){
                        setCost(comp.cost);
                        console.log(`COST: ${cost}`)
                        setCostView(true);

                        setProblemView(false);                        
                        setAboutView(false);
                        setSolutionView(false);
                        setImplementationView(false); 
                        setLetterView(false);
                    }
                    
                    if(component == comp.code && component == 'letter'){
                        setLetter(comp.letter);
                        console.log(`LETTER: ${letter}`);
                        setLetterView(true);

                        setProblemView(false);                        
                        setAboutView(false);
                        setSolutionView(false);
                        setImplementationView(false);
                        setCostView(false); 
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

    const saveProposal = async () => {
        setLoading(true);
        console.log("saving proposal...");
        try {
          const request = await fetch(`${BASE_URL}/proposal/${id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${BEARER_TOKEN}`,
            },
            body:JSON.stringify({
                company_id: id,
                client_id: client.id,
                offering,
                description
            }),
          });
          const response = await request.json(); 
          setLoading(false);
          if (request.ok) {
            navigate('/proposals');
            //setLoading(false);
          }
        } catch (error) {
            setLoading(false);
            alert(error)
          console.log(error);
        }
    };
    
    return (
        <div style={{ minHeight: '93.8vh' }}>
            <Header /> 

            <Grid sx={{}} container>
                {/* <Grid item xs={12} sm={3} md={3} lg={3}></Grid>  */}
                <Grid item xs={12} sm={9} md={9} lg={9} sx={{ px: 20, py: 2 }}><Typography variant='h3' sx={{ color: '#3C0B79' }}>Proposal</Typography></Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}><br /></Grid>
            </Grid>

            <Grid sx={{ px: 20 }} spacing={1} container >
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Box sx={{ background: '#000040', width: '20rem', height: '28rem', boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff' }}>
                        <Typography variant='h4' sx={{ p: 2, color: 'gold' }}>
                            Proposal Outline
                        </Typography>

                        <Grid container spacing={1} sx={{ px: 3 }}>
                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>1. Covering Letter</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>toggleSectionView('letter')}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('letter')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>2. About Us</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>toggleSectionView('about')}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }}  onClick={()=>improveProposal('about')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>3. Problem</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>toggleSectionView('problem')}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('problem')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>4. Solution</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>toggleSectionView('solution')}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('solution')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>5. Implementation</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>toggleSectionView('implementation')}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('implementation')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>6. Cost</Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#87EACA' }} onClick={()=>toggleSectionView('cost')}><EditNote /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={()=>improveProposal('cost')}><RefreshOutlined /></Button></Grid>

                            <Grid item xs={6} sm={8} md={8} lg={8}><Button sx={{ color: '#fff' }}>Preview</Button></Grid>
                            <Grid item xs={6} sm={2} md={2} lg={2}><Button sx={{ color: '#fff' }} onClick={()=>toggleSectionView('preview')}><PreviewTwoTone /></Button></Grid>
                            <Grid item xs={3} sm={2} md={2} lg={2}><Button sx={{ color: '#F1C153' }} onClick={saveProposal}><SaveAs /></Button></Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Box sx={{ p:2, textAlign: 'justify', background: '#EEF2F2', minHeight: '28rem', boxShadow: '0 2px 9px 0 #888888', color: 'black', border: '1px solid #fff' }}>
                        {loading && "Loading..."}
                        {!loading && !aboutView && !letterView && !problemView && !solutionView && !implementationView  && !costView && !preview 
                        && <><Mascot/> <Typography variant='h6' sx={{ p: 2, }}>Conjure Something...Use the proposal outline to start.</Typography></>}
                        {!loading && about && aboutView &&
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
                            <Grid container>
                                <Grid item xs={12} md={12}><Typography variant='h4'>Templates</Typography></Grid> 
                                <Grid item xs={12} md={4}>
                                    <Button onClick={()=>toggleTemplateView(0)}>
                                        <img src={`${templateDefault}`}  alt="Template Default" 
                                        style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff'}}/>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Button onClick={()=>toggleTemplateView(1)}>
                                        <img src={`${templateOne}`}  alt="Template One"  
                                        style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', color: '#fff', border: '1px solid #fff'}}/>   
                                    </Button>
                                    
                                </Grid> 
                                <Grid item xs={12} md={4}>
                                    <div style={{width:'15rem',height:'20rem',boxShadow: '0 2px 9px 0 #888888', background: '#fff', border: '1px solid #fff'}}>
                                        <Typography variant='h5' sx={{p:5, color: '#000'}}>Coming soon...</Typography>
                                    </div>
                                </Grid>                                 
                            </Grid>

                            <Typography variant='h4' sx={{ p: 2, }}>
                            Proposal Preview
                            {/* <Button onClick={handleExport}><ImportExportOutlined/></Button> */}
                            </Typography>

                            {templateDefaultView && ( 
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
                            )}
                            
                            {templateOneView && (   
                            <Editor onEditorChange={()=>log2Preview} 
                                onInit={(evt, editor) => previewEditor2Ref.current = editor} 
                                initialValue=
                                {
                                    "<div style='background: #000; color:#fff; padding: 1rem;'>"+
                                         
                                        +"<p style='text-align:left;width: 5rem; marginTop: 2rem'>"
                                        +company.name+", <br/>"
                                        +companyAddress[0]                                          
                                        +"</p>"+

                                         "<h4>"+offering?.toUpperCase()+"</h4>"+
                                        "<h4 style='text-decoration: underline'>"+new Date(client.updated_at).getFullYear()+"</h4>"+
                                         
                                        "<table>"+
                                        "<tr>Line</tr>"+
                                        "</table>"+
                                        

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
                                        "<p>"+cost+"</p><br/>"+
                                    "</div>"

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
                            )}
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