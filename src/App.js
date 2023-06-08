// Imports
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { Header } from './components/HeaderNav/HeaderNav';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Search } from './components/Search/Search';
import { Favorites } from './components/Favorites/Favorites';
import { NotFound } from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/GalleryApp'>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path='*' element ={<NotFound/>} />  
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
