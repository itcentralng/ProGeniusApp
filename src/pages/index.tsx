import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Proposals from '../components/proposals';
import Dashboard from './dashboard';


const Main = ()=>{
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/proposals' element={<Proposals/>} />
    </Routes>
  )
}

export default Main;