import React from 'react'
import './Home.css'
import image from '../../assets/parallax-frame1.png'

export const Home = () => {
  return (
    <div className='home'>
      <div className='titles-container'>
        <h1>Explore images</h1>
        <h2>Add to favorites</h2>
        <h3>Download pics</h3>
        <h4>Filter and order</h4>
        <h5>All in one page</h5>
      </div>
      <div className='image-container'>
        <img src={image} alt="" />
      </div>
    </div>
  )
}
