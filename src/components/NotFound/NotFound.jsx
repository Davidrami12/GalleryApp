// Icons from MUI
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

// Imports
import React from 'react'
import { Link } from 'react-router-dom';
import './NotFound.css'

export const NotFound = () => {
  return (
    <div className='error-container'>
        <h1 className='error-info'><ErrorRoundedIcon className='icon-data' sx={{color: 'red', fontSize: 40}}/> Error 404 - Page not found</h1>
        <h4 className='error-info'>Oops... <SentimentVeryDissatisfiedIcon className='icon-data' sx={{fontSize: 25}}/> The page you are looking for may have been moved, deleted, or possibly never existed.</h4>
        <h5 className='error-info'>But don't worry, it was not your fault! Come back to <Link to='/' className='home-link'><HomeRoundedIcon className='icon-data' sx={{fontSize: 25}}/>Home page </Link></h5>
    </div>
  )
}