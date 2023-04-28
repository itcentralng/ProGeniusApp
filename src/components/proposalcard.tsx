import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {DocumentScannerSharp, DeleteForever } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; 

import debounce from 'lodash/debounce'; //yarn add lodash-es && yarn add -D @types/lodash-es
import {useNavigate, Navigate } from 'react-router-dom'; 
import { Button, CircularProgress } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface Props {
  id: number,
  title: string, //offering
  description: string, 
  client_address: string,
  client_updated_at: Date,
  client_email: string,
  client_logo: string,
  client_name: string,
  client_rep: string,
  client_role: string,
 
  components_content: string,
}

const ProposalCard = (data: Props) => {

  const [width, setWidth] = useState(window.innerWidth);

  const containerRef = useRef<HTMLDivElement>(null);

    /*useEffect(() => {
        const handleResize = debounce(() => {
        setWidth(window.innerWidth);
        }, 500);

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [width]); */
    useEffect(() => {
      const resizeObserver = new ResizeObserver(
        debounce((entries) => {
          const { width } = entries[0].contentRect;
          setWidth(width);
        }, 500)
      );
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }, []);

  const [bg] = useState('#000040');
  const [expanded, setExpanded] = React.useState(false);
  const [coveringLetter] = ['A','B','C'];//React.useState(data.components_content.split('\n'));

   

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const id = data.id;
  const navigate = useNavigate();
  const handleClick = ()=>{
    //navigate(`/document`,  { replace: true,  state: id })
    navigate(`/document`, { state: id })//navigate(`/document/${id}`)
    //<Navigate to='/document' state={id} replace={true}/>
    console.log(`NAVIGATED`)
  }

  const BASE_URL = process.env.REACT_APP_API_URL; 
  const BEARER_TOKEN = localStorage.getItem('token');
     
  const [deleteLoader, setDeleteLoader] = useState(false); 
  const deleteProposal = async()=>{
    //alert(`Company: ${company} Client: ${client} Desc: ${description} Offering: ${offering}`);
    setDeleteLoader(true);
    try {
        const request = await fetch(`${BASE_URL}/proposal/${id}`, {
        method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${BEARER_TOKEN}`,
            }, 
        });
        const response = await request.json();
        setDeleteLoader(false);
        if (request.ok) {
          //setClients(response); 

        }
      } catch (error) {
        setDeleteLoader(false);
        console.log(error);
      }
  }

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

 
  return (
    <>
    {/* // <Card  key={'card-'+data.id}
    // sx={{ width: '20rem', height:'28rem', boxShadow: '0 2px 9px 0 #888888', border: `5px solid ${bg}`, overflowY: 'auto' }} variant='outlined'> */}
    <Card  key={'card-'+data.id}
    sx={{ minWidth: '5rem', minHeight:'10rem', boxShadow: '0 2px 9px 0 #888888', border: `5px solid ${bg}`, overflowY: 'auto' }} variant='outlined'>   
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: bg }} aria-label="myproposal">
            {data.client_name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ color: bg }}>
            <MoreVertIcon/>
          </IconButton>
        }
        title={data.title} 
        subheader={new Date(data.client_updated_at).toDateString()}
      />
      {!deleteLoader && 
      <CardMedia 
        component="img"
        height="194" 
        image={data.client_logo} 
        alt="Client Logo"
      />}

      {deleteLoader && <div style={{display:'flex', alignContent: 'center', justifyContent: 'center'}}><CircularProgress  color="secondary" /></div>}
      
      { !deleteLoader && (
      <>
      
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'justify'}}>
          {data.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        
        <IconButton aria-label="share" sx={{ color: bg }}>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="add to favorites"  sx={{ color: bg }}  
        onClick={handleClick}> <DocumentScannerSharp/>          
        </IconButton>

        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"  
          sx={{ color: bg }}
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
        <ExpandMore
          expand={expanded}
          onClick={handleClickOpenDialog}
          aria-expanded={expanded}
          aria-label="show more"  
          sx={{ color: bg }} size='medium'
        >
           <DeleteForever/>
        </ExpandMore>
         

      </CardActions>

      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Covering Letter:</Typography>
          {
            // coveringLetter.map(part=>(
            //   <Typography paragraph sx={{textAlign: 'justify'}}>{part}<br/></Typography>
            // ))
            <Typography paragraph sx={{textAlign: 'justify'}}>{coveringLetter}<br/></Typography>

          }            
        </CardContent>
      </Collapse> */}

      </>
      )}
    </Card>

    <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Proposal?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Proceed to delete {data.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={deleteProposal} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProposalCard;