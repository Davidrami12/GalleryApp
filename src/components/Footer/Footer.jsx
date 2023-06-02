// Imports
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <p>
        <a href='https://github.com/Davidrami12/GalleryApp' target='_blank' rel="noreferrer"> GalleryApp - made by  @Davidrami12 at&nbsp;<GitHubIcon sx={{fontSize: 20}} className='github-icon'/>&nbsp;GitHub</a>
      </p>
    </div>
  )
}
