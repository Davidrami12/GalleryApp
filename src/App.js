// Imports
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components & Pages
import { Header } from './components/HeaderNav/HeaderNav';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search/Search';
import { Favorites } from './pages/Favorites/Favorites';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/GalleryApp'>
        <ToastContainer 
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
          style={{ fontSize: "1rem", marginTop: "100px", marginBottom: "12px" }}
        />
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="*" element ={<NotFound/>} />  
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
