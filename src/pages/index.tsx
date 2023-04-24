import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './dashboard';


const Main = ()=>{
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>} />
        
    </Routes>
  )
}

export default Main;