import React from 'react'
import Header from './header'
import { useLocation } from 'react-router-dom'

function DocumentView() {
    //const location = useLocation();
    //const document = location.state;
  return (
    <div style={{minHeight: '90vh'}}>
        <Header/>
        {/* {document} */}
    </div>
  )
}

export default DocumentView