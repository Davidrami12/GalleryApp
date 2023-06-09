import React from 'react'
import './Home.css'
import image from '../../assets/parallax-frame1.png'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='home'>
      <div className='titles-container'>
        <h1>Explore new images</h1>
        <h2>Download pictures</h2>
        <h3>Add to favorites</h3>
        <h4>Filter and order</h4>
        <h5>All in one page</h5>
        <div className='search-button-container'>
          <Link to="/search">
            <button>Go to Search! <ImageSearchIcon className='icon-data'/></button>
          </Link>
        </div>
        
      </div>
      
      <div className='image-container'>
        <img src={image} alt="" className='image-home' />
      </div>
    </div>
  )
}
