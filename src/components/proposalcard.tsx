import React, { useEffect, useState } from 'react';
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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

  const [bg] = useState('#2376AD');
  const [expanded, setExpanded] = React.useState(false);
  const [coveringLetter] = React.useState(data.components_content.split('\n'));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  return (
    <Card key={data.id} 
    sx={{ width: '20rem', height:'28rem', boxShadow: '0 2px 9px 0 #888888', border: `5px solid ${bg}`, overflowY: 'auto' }} variant='outlined'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.client_name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title} 
        subheader={new Date(data.client_updated_at).toDateString()}
      />
      <CardMedia
        component="img"
        height="194" 
        image={data.client_logo} 
        alt="Client Logo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Covering Letter:</Typography>
          {
            coveringLetter.map(part=>(
              <Typography paragraph sx={{textAlign: 'justify'}}>{part}<br/></Typography>
            ))
          }            
        </CardContent>
      </Collapse>

    </Card>
  )
}

export default ProposalCard;