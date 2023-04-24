import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { AddBusinessTwoTone, AddBoxOutlined, AddCardRounded } from '@mui/icons-material';


export interface Props {
  title: string,
  count: number,
}
const CounterCard = (data:Props)=> {

  const [bg, setBg ] = useState('#fff');

  const bgChange = (title: String)=>{
    let bgColor = '#fff';
    switch(title){
      case 'Proposals':
        bgColor =  '#2376AD';
        break;
      case 'Clients':
        bgColor =  '#16888C';
        break;
      case 'Companies':
        bgColor =  '#6A50A4';
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
        <Button size='small'>View Details</Button>
        
        <Button size='large' sx={{pl: '9rem'}}>
          {data?.title == 'Companies' && <AddBusinessTwoTone/>}
          {data?.title == 'Proposals' && <AddCardRounded/>}
          {data?.title != 'Proposals' && data?.title != 'Companies' && <AddBoxOutlined/>}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CounterCard;