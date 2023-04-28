import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { AddBusinessTwoTone, AddBoxOutlined, AddCardRounded } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'; 

export interface Props {
  title: string,
  count: number,
  items: any
  //toggleViewProposals: void,
}
const CounterCard = (data:Props)=> {
  const navigate =useNavigate();
  const [bg, setBg ] = useState('#fff');
  const [nav, setNav] = useState('/proposals')

  const bgChange = (title: String)=>{
    let bgColor = '#fff';
    switch(title){
      case 'Proposals':
        bgColor =  '#2376AD';
        setNav('/proposals');
        break;
      case 'Clients':
        bgColor =  '#16888C';
        setNav('/clients');
        break;
      case 'Companies':
        bgColor =  '#6A50A4';
        setNav('/companies');
        break;
      default:
        bgColor = '#fff';
    }
    setBg(bgColor);
  }
  useEffect(()=>{
    bgChange(data.title);
  },[data])
  
  return (
     
    <Card sx={{width: '20rem', boxShadow:'0 2px 9px 0 #888888', border: `5px solid ${bg}` }} variant='outlined'>
      <CardContent sx={{background: bg}}>
        <Typography variant='h4' component='h1' sx={{color: 'gold'}}>{data?.title}</Typography>
        <Typography variant='h5' component='h1' sx={{color:'#fff'}}>{data?.count}</Typography>
      </CardContent>
      <CardActions sx={{opacity: .8}}>
        <Button size='small' onClick={()=>navigate(nav, { state: data.items})}>View Details</Button>
        
        {/* <Button size='large' sx={{pl: '9rem'}} >
          {data?.title == 'Companies' && <AddBusinessTwoTone/>}
          {data?.title == 'Proposals' && <AddCardRounded/>}
          {data?.title != 'Proposals' && data?.title != 'Companies' && <AddBoxOutlined/>}
        </Button> */}

        {data?.title == 'Companies' && <><Button size='large' sx={{pl: '9rem'}}  onClick={()=>navigate('/company/new')}><AddBusinessTwoTone/></Button></>}
        {data?.title == 'Proposals' && <><Button size='large' sx={{pl: '9rem'}}  onClick={()=>navigate('/document/new')}><AddCardRounded/></Button></>}
        {data?.title != 'Proposals' && data?.title != 'Companies' && 
        <><Button size='large' sx={{pl: '9rem'}}  onClick={()=>navigate('/client/new')}><AddBoxOutlined/></Button></>}
          

      </CardActions>
    </Card>
     
  )
}

export default CounterCard;