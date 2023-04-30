import { Button, Card, CardContent, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header'
import Mascot from '../components/mascot'
import logo from '../components/images/logo.png';
import coverImage from '../components/images/template_one_cover.png';
import aboutImage from '../components/images/template_one_about.png';
import problemImage from '../components/images/template_one_problem.png';
import implementationImage from '../components/images/template_one_implementation.png';
import solutionImage from '../components/images/template_one_solution.png';
import costingImage from '../components/images/template_one_costing.png';


import problemStatementImage from '../components/images/problem_statement.png';
import solutionWriteUpImage from '../components/images/solution.png';
import implementationWriteUpImage from '../components/images/implementation.png';
import costingWriteUpImage from '../components/images/costing.png';
import { EditNoteRounded, ContactPhoneSharp, ContactMailSharp, Person2Outlined } from '@mui/icons-material';

function Template() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const BEARER_TOKEN = localStorage.getItem('token');

    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(false);
    const [proposal, setProposal]: any = useState({});

    useEffect(() => {
        setProposal(location.state.proposal);
    }, []);

    const [cover, setCover] = useState(true);
    const [about, setAbout] = useState(false);
    const [problem, setProblem] = useState(false);
    const [implementation, setImplementation] = useState(false);
    const [solution, setSolution] = useState(false);
    const [cost, setCost] = useState(false);

    const splitStringByWhitespace = (str: string) =>{
        if (str){
            const words = str.split(' ');
            const mid = Math.ceil(words.length / 2);
            const part1 = words.slice(0, mid).join(' ');
            const part2 = words.slice(mid).join(' ');
            return [part1, part2];
        }
        return ['', '']
      }
      

    const toggleSection = (sectionId: number) => {
        switch (sectionId) {
            case 1:
                setCover(true);
                setAbout(false);
                setProblem(false);
                setImplementation(false);
                setSolution(false);
                setCost(false);
                break;
            case 2:
                setCover(false);
                setAbout(true);
                setProblem(false);
                setImplementation(false);
                setSolution(false);
                setCost(false);
                break;
            case 3:
                setCover(false);
                setAbout(false);
                setProblem(true);
                setImplementation(false);
                setSolution(false);
                setCost(false);
                break;
            case 4:
                setCover(false);
                setAbout(false);
                setProblem(false);
                setImplementation(true);
                setSolution(false);
                setCost(false);
                break;
            case 5:
                setCover(false);
                setAbout(false);
                setProblem(false);
                setImplementation(false);
                setSolution(true);
                setCost(false);
                break;
            case 6:
                setCover(false);
                setAbout(false);
                setProblem(false);
                setImplementation(false);
                setSolution(false);
                setCost(true);
                break;
            default:
                setCover(true);
                setAbout(false);
                setProblem(false);
                setImplementation(false);
                setSolution(false);
                setCost(false);

        }
    }

    return (

        <div style={{ background: '#fff', minHeight: '93.8vh' }}>

            <Header />

            <Grid sx={{ p: 6, }} container spacing={1}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <Card>
                        {/* <Typography variant='h3' sx={{ background: '#000040', color: '#fff', opacity: .7, p: 8, py: 3, borderBottom: '1px solid black' }}>Modern Template</Typography> */}
                        <CardContent sx={{}}>

                            <Grid sx={{ p: 1, color: '#fff' }} container spacing={4}>

                                <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, mx: 2 }}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Button sx={{ background: 'black', padding: '1rem', width: '100%', boxShadow: '0 2px 9px 0 #888888', color: '#fff' }}
                                            onClick={() => navigate('/document', { state: proposal?.id })}>
                                            <EditNoteRounded />
                                            Edit Proposal
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Typography variant='h5' sx={{ textAlign: 'center' }}>Cover</Typography>
                                        <Button onClick={() => toggleSection(1)}>
                                            <img src={coverImage} alt="Cover Image"
                                                style={{
                                                    width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                    color: '#fff', border: '1px solid #fff'
                                                }} />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Typography variant='h5' sx={{ textAlign: 'center' }}>About</Typography>
                                        <Button onClick={() => toggleSection(2)}>
                                            <img src={aboutImage} alt="About Image"
                                                style={{
                                                    width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                    color: '#fff', border: '1px solid #fff'
                                                }} />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Typography variant='h5' sx={{ textAlign: 'center' }}>Problem</Typography>
                                        <Button onClick={() => toggleSection(3)}>
                                            <img src={problemImage} alt="Problem Image"
                                                style={{
                                                    width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                    color: '#fff', border: '1px solid #fff'
                                                }} />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Typography variant='h5' sx={{ textAlign: 'center' }}>Solution</Typography>
                                        <Button onClick={() => toggleSection(5)}>
                                            <img src={solutionImage} alt="Solution Image"
                                                style={{
                                                    width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                    color: '#fff', border: '1px solid #fff'
                                                }} />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Typography variant='h5' sx={{ textAlign: 'center' }}>Implementation</Typography>
                                        <Button onClick={() => toggleSection(4)}>
                                            <img src={implementationImage} alt="Implementation Image"
                                                style={{
                                                    width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                    color: '#fff', border: '1px solid #fff'
                                                }} />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                        <Typography variant='h5' sx={{ textAlign: 'center' }}>Costing</Typography>
                                        <Button onClick={() => toggleSection(6)}>
                                            <img src={costingImage} alt="Costing Image"
                                                style={{
                                                    width: '13rem', height: '15rem', padding: '1rem', boxShadow: '0 2px 9px 0 #888888',
                                                    color: '#fff', border: '1px solid #fff'
                                                }} />
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1}></Grid>

                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Card>
                        {/* <Typography variant='h3' sx={{ background: '#000040', color: '#fff', opacity: .7, p: 8, py: 3, borderBottom: '1px solid black' }}>Modern Template</Typography> */}
                        <CardContent sx={{ p: 2, background: 'black' }}>


                            {cover && (
                                <>
                                    <Grid sx={{ p: 6, color: '#fff' }} container spacing={4}>

                                        <Grid item xs={12} md={6}>
                                            <Grid item xs={12} md={12}>
                                                <div style={{ width: '10%', border: '3px solid #fff' }}></div>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {proposal?.company?.name}
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {proposal?.company?.address}
                                            </Grid>

                                            <Grid item xs={12} md={12} sx={{ width: '40%', height: '50vh', border: '3px solid #fff', my: 2 }}>
                                                <Grid item xs={12} md={12} sx={{ m: 8, my: 15, p: 1, background: 'black', minWidth: '100%' }}>
                                                    <Grid item xs={12} md={12}><Typography variant='h3' sx={{ fontWeight: 'bold', color: 'gold' }}>{splitStringByWhitespace(proposal?.offering)[0]}</Typography></Grid>
                                                    <Grid item xs={12} md={12} sx={{ minWidth: '25rem' }}><Typography variant='h4'>{splitStringByWhitespace(proposal?.offering)[1]}</Typography></Grid>
                                                    {/* <Grid item xs={12} md={12}><Typography variant='h5' sx={{ borderBottom: '1px solid #fff' }}>{new Date(proposal.updated_at).getFullYear()}</Typography></Grid> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, mx: 2 }}>
                                            <Grid item xs={12} sm={5} md={5} lg={5}>
                                                <Typography variant='h5'>PROPOSED TO:</Typography>
                                                <Typography variant='h6'>{proposal?.client?.name}</Typography>
                                            </Grid>

                                            <Grid item xs={12} sm={7} md={7} lg={7}>
                                                <Typography variant='h5' sx={{ px: 15 }}>PREPARED BY:</Typography>
                                                <Typography variant='h6' sx={{ px: 15 }}>{proposal?.company?.name}</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <br/>
                                    <Grid sx={{ p: 6, color: '#fff', borderTop: '2px solid #fff' }} container spacing={1}>

                                        <Grid item xs={12} md={12}>
                                            <Grid item xs={12} md={12}
                                                sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', }}>
                                                <Grid item xs={6} md={10}></Grid>
                                                <Grid item xs={6} md={2}>
                                                    <div>{proposal?.company?.name}</div>
                                                    <div>{proposal?.company?.address}</div>
                                                    <div><br/></div>
                                                    <div>{new Date(proposal?.updated_at).toLocaleDateString()}</div> 
                                                </Grid>
                                            </Grid>

                                            {/* <Grid item xs={12} md={12}>
                                                <Grid item xs={12} md={4}> </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <img src={costingWriteUpImage} alt="problem Statement Image" style={{ width: '10rem', height: '10rem' }} />
                                                </Grid>
                                                <Grid item xs={12} md={4}> </Grid>                                                
                                            </Grid> */}

                                            <Grid item xs={12} md={12}>
                                                <div>{proposal?.client?.role}</div>
                                                <div>{proposal?.client?.name}</div>
                                                <div>{proposal?.client?.address}</div>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Typography variant='h6' sx={{textDecoration: 'underline'}}>{proposal?.offering?.toUpperCase()}</Typography>
                                            </Grid>                                            

                                            <Grid item xs={12} md={12} sx={{ minWidth: '100%', my: 2, textAlign: 'justify' }}>
                                            <div dangerouslySetInnerHTML={{ __html: proposal?.components?.find((c: any) => c.code == 'letter')?.content }}></div>
                                            </Grid>

                                            
                                        </Grid>

                                        <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, }}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Typography variant='h6' sx={{ borderBottom: '3px solid #fff' }}>                                                     
                                                <Person2Outlined sx={{mx:3}}/>{proposal?.company?.rep}
                                                <ContactPhoneSharp sx={{mx:3}}/>{proposal?.company?.phone} 
                                                <ContactMailSharp sx={{mx:3}}/>{proposal?.company?.email}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </>
                            )}

                            {about && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={1}>

                                    <Grid item xs={12} md={12}>
                                        <Grid item xs={12} md={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', }}>
                                            <Grid item xs={6} md={10}></Grid>
                                            <Grid item xs={6} md={2}>
                                                <div style={{ width: '60%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '40%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '20%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <Typography variant='h4'>{new Date(proposal?.updated_at).getFullYear()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>About</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Company</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center', }}>
                                            {proposal?.company?.logo != '' && (
                                                <>
                                                    <img src={problemStatementImage} alt="Company Image" style={{ width: '20rem', height: '20rem' }} />
                                                    <div style={{ height: '5rem', marginLeft: '10rem', borderLeft: '3px solid #fff' }}></div>
                                                </>
                                            )}

                                            {proposal?.company?.logo == '' && (
                                                <>
                                                    <div style={{ height: '5rem', borderLeft: '3px solid #fff', }}></div>
                                                </>
                                            )}
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ minWidth: '100%', my: 2, textAlign: 'justify' }}>
                                            {/* {proposal?.components?.filter((c: any) => c.code == 'about')[0]?.content} */}
                                            <div dangerouslySetInnerHTML={{ __html: proposal?.components?.find((c: any) => c.code == 'about')?.content }}></div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant='h5' sx={{ borderBottom: '3px solid #fff' }}>Proposal: {proposal?.offering}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}

                            {problem && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={1}>

                                    <Grid item xs={12} md={12}>
                                        <Grid item xs={12} md={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', }}>
                                            <Grid item xs={6} md={10}></Grid>
                                            <Grid item xs={6} md={2}>
                                                <div style={{ width: '60%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '40%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '20%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <Typography variant='h4'>{new Date(proposal?.updated_at).getFullYear()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Project</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Background</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center', }}>
                                            <>
                                                <div style={{ height: '5rem', marginLeft: '20rem', marginRight: '1rem', borderRight: '3px solid #fff' }}></div>
                                                <img src={problemStatementImage} alt="problem Statement Image" style={{ width: '26rem', height: '20rem' }} />
                                            </>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ minWidth: '100%', my: 2, textAlign: 'justify' }}>
                                            {/* {proposal?.components?.filter((c: any) => c.code == 'problem')[0]?.content} */}
                                            <div dangerouslySetInnerHTML={{ __html: proposal?.components?.find((c: any) => c.code == 'problem')?.content }}></div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant='h5' sx={{ borderBottom: '3px solid #fff' }}>Proposal: {proposal?.offering}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}

                            {implementation && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={1}>

                                    <Grid item xs={12} md={12}>
                                        <Grid item xs={12} md={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', }}>
                                            <Grid item xs={6} md={10}></Grid>
                                            <Grid item xs={6} md={2}>
                                                <div style={{ width: '60%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '40%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '20%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <Typography variant='h4'>{new Date(proposal?.updated_at).getFullYear()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Goals &</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Objectives</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center', flexDirection: 'column' }}>
                                            <>
                                                <div style={{ width: '15rem', height: '1rem', marginLeft: '33rem', marginBottom: '1rem', borderBottom: '3px solid #fff' }}></div>
                                                <img src={implementationWriteUpImage} alt="Implementation Image" style={{ width: '100%', height: '20rem' }} />
                                            </>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ minWidth: '100%', my: 2, textAlign: 'justify' }}>
                                            {/* {proposal?.components?.filter((c: any) => c.code == 'implementation')[0]?.content.split(':')[0]}: */}
                                            <div dangerouslySetInnerHTML={{ __html: proposal?.components?.find((c: any) => c.code == 'implementation')?.content }}></div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant='h5' sx={{ borderBottom: '3px solid #fff' }}>Proposal: {proposal?.offering}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}

                            {solution && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={1}>

                                    <Grid item xs={12} md={12}>
                                        <Grid item xs={12} md={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', }}>
                                            <Grid item xs={6} md={10}></Grid>
                                            <Grid item xs={6} md={2}>
                                                <div style={{ width: '60%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '40%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '20%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <Typography variant='h4'>{new Date(proposal?.updated_at).getFullYear()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Solution</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center', flexDirection: 'column' }}>
                                            <>
                                                <div style={{ width: '15rem', height: '1rem', marginLeft: '33rem', marginBottom: '1rem', borderBottom: '3px solid #fff' }}></div>
                                                <img src={solutionWriteUpImage} alt="Solution Image" style={{ width: '100%', height: '20rem' }} />
                                            </>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ minWidth: '100%', my: 2, textAlign: 'justify' }}>
                                            {/* {proposal?.components?.filter((c: any) => c.code == 'solution')[0]?.content} */}
                                            <div dangerouslySetInnerHTML={{ __html: proposal?.components?.find((c: any) => c.code == 'solution')?.content }}></div>
                                            <br /><br />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant='h5' sx={{ borderBottom: '3px solid #fff' }}>Proposal: {proposal?.offering}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}

                            {cost && (
                                <Grid sx={{ p: 6, color: '#fff' }} container spacing={1}>

                                    <Grid item xs={12} md={12}>
                                        <Grid item xs={12} md={12}
                                            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', }}>
                                            <Grid item xs={6} md={10}></Grid>
                                            <Grid item xs={6} md={2}>
                                                <div style={{ width: '60%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '40%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <div style={{ width: '20%', border: '3px solid #fff', margin: '.5rem' }}></div>
                                                <Typography variant='h4'>{new Date(proposal?.updated_at).getFullYear()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Project</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h3'>Costing</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center', }}>
                                            <>
                                                <div style={{ height: '5rem', marginLeft: '20rem', marginRight: '1rem', borderRight: '3px solid #fff' }}></div>
                                                <img src={costingWriteUpImage} alt="problem Statement Image" style={{ width: '26rem', height: '20rem' }} />
                                            </>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ minWidth: '100%', my: 2, textAlign: 'justify' }}>
                                        <div dangerouslySetInnerHTML={{ __html: proposal?.components?.find((c: any) => c.code == 'cost')?.content }}></div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} xs={12} md={12} sx={{ my: 5, }}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant='h5' sx={{ borderBottom: '3px solid #fff' }}>Proposal: {proposal?.offering}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
            </Grid>
        </div>

    )
}

Template.propTypes = {}
export default Template