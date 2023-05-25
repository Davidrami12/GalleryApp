import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import './HeaderNav.css'

export const Header = () => {
  const location = useLocation();

  return (
    <div className='header'>
      <div className='header-container'>
        <Link 
          to="/" 
          className={`header-title ${location.pathname === '/' ? 'active-link' : ''}`}>
          GalleryApp
        </Link>
        
          <div className='nav-links'>
            <Link 
              to="/search" 
              className={`header-link ${location.pathname === '/search' ? 'active-link' : ''}`}>
                <SearchIcon sx={{ fontSize: 28 }}/> Search
            </Link>
            
            <HorizontalRuleIcon className='separator' sx={{ fontSize: 46,  transform: "rotate(90deg)"}}/>
            
            <Link 
              to="/favorites" 
              className={`header-link ${location.pathname === '/favorites' ? 'active-link' : ''}`}>
                <FavoriteIcon  sx={{ fontSize: 28 }}/> Favorites 
            </Link>
          </div>

          
      </div>
        
    </div>
  )
}
