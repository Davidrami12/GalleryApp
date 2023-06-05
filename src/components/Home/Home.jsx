import React from 'react'
import './Home.css'
import image from '../../assets/parallax-frame1.png'

export const Home = () => {
  return (
    <div className='home'>
      <div className='titles-container'>
        <h1>Explore new images</h1>
        <h2>Download pictures</h2>
        <h3>Add to favorites</h3>
        <h4>Filter and order</h4>
        <h5>All in one page</h5>
      </div>
      
      <div className='image-container'>
        <img src={image} alt="" className='image-home' />
      </div>
    </div>
  )
}
