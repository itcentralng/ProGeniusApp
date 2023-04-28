import React from 'react';
import '../components/fonts/quicksand.woff2';

import {Routes, Route} from 'react-router-dom';
import Proposals from '../components/proposals';
import DocumentView from './document';
import Dashboard from './dashboard';
import NewDocument from './newDocument';
import Home from './home';
import Register from './register';
import Login from './login';
import NewClient from './newClient';
import NewCompany from './newCompany';



const Main = ()=>{
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/proposals' element={<Proposals/>} />
        {/* <Route path='/document/:id' element={<DocumentView/>} /> */}
        <Route path='/document' element={<DocumentView/>} />
        <Route path='/document/new' element={<NewDocument/>} />

        <Route path='/client/new' element={<NewClient/>}/>
        <Route path='/company/new' element={<NewCompany/>}/>
    </Routes>
  )
}

export default Main;