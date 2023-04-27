import { Typography, Box, colors, Button } from '@mui/material';
import { LogoutRounded, LoginRounded } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import mascot from '../components/images/[removal.ai]mascot.png';
import logo from '../components/images/logo.png';

function Header() {
    const navigate = useNavigate();
    const user = localStorage.getItem('email');
    
    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/')
    }

    useEffect(()=>{
        !user && navigate('/');
    },[])

    return (
        <Box sx={{ color: 'gold', p: 2, px: 20, background: '#000040'/*background:'#3C0B79', boxShadow:'0 2px 9px 0 #888888'*/ }}>
           
            <div style={{ color: 'gold', fontSize: '1.3rem', }}>
                <img src={logo} width='25rem' style={{ marginLeft: '1rem' }} />
                <Button sx={{ color: 'gold', fontSize: '1.2rem' }} onClick={() => navigate('/')}>ProGenius</Button>

                {user && (
                    <>
                        <Button sx={{ ml: 120, color: '#fff' }}>
                            <img src={`${mascot}`} width="40px" height="40px"
                                style={{
                                    borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 9px 0 #888888',
                                    padding: '.1rem',
                                }} alt="Profile Image" />
                        </Button>
                        <Button sx={{ px: 2, color: '#fff', border: '1.5px solid white', boxShadow: '0 2px 9px 0 #888888' }} onClick={() => logout()}>
                            Logout <LogoutRounded sx={{ color: '#fff' }} />
                        </Button>
                    </>
                )}

                {/* {!user && 
                    (
                    <Button sx={{ ml: 120, px: 2, color: '#fff', border: '1.5px solid white', boxShadow: '0 2px 9px 0 #888888' }} onClick={() => navigate('/login')}>
                        Login <LoginRounded sx={{ color: '#fff' }} />
                    </Button>
                    ) 
                } */}
                
            </div>


        </Box>
    )
}

export default Header;