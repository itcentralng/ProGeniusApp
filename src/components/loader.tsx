import { makeStyles, withStyles } from '@mui/material';
import React, { useState, useEffect} from 'react'; 
import { Spinner } from './icons/Spinner';

function Loader() {   
   //const style = useStyles();
//   return (
//     <div className={style.loading}>
//         <div className={style.wrapper}></div>
//         <div className={style.text}>Loading...</div>
//         <Spinner size='3' color='#152E88' />
//     </div>
//   )
    return (<div>Loading...</div>)
}

/*const useStyles = makeStyles({
    loading: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#E5E5E5',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem'
    },
    text: {
        wordSpacing: 5,
        fontSize: '2rem',
    }
})*/

export default Loader;