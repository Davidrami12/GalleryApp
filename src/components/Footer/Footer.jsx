// Imports
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <p>GalleryApp - made by @Davidrami12 at GitHub <GitHubIcon sx={{fontSize: 20}} className='github-icon'/></p>
    </div>
  )
}
