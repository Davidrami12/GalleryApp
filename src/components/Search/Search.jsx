import React from 'react'
import './Search.css'
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../features/search/searchSlice";
import { selectPhotos } from "../../features/search/searchSlice";

//Components
import Card from "../Card/Card";
import Loading from "../Loading/Loading";




export const Search = () => {

  const [phRepeat, setPhRepeat] = useState([]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const photoDataResult = useSelector(selectPhotos);
  const favourites = useSelector((state) => state.favourite);

  useEffect(() => {
    dispatch(getPhotos({ value: value }));
  }, [value, dispatch]);

  useEffect(() => {
    let repeatPhotosArray = [];
    let sw = false;

    for (let index = 0; index < photoDataResult.length; index++) {
      sw = false;

      for (let i = 0; i < favourites.length; i++) {
        if (photoDataResult[index].id === favourites[i].id) {
          sw = true;
          break;
        }
      }
      sw === true
        ? repeatPhotosArray.push(true)
        : repeatPhotosArray.push(false);
      setPhRepeat(repeatPhotosArray);
    }
  }, [photoDataResult]);



  return (
    <div>
      <form action="" id='search-form' /*onSubmit={handleSubmit}*/>
        <div class="input-group">
          <div className='icon-container'>
            <SearchIcon sx={{ fontSize: 28 }}/>
          </div>
          <input type='text' 
            id='' 
            class='search-input' 
            placeholder='Explore images...' 
            onKeyUp={(e) => setValue(e.target.value)}/>

          <button 
            type='submit' 
            class='submit-button' 
            /*onClick={(e) => handleSubmit(e)}*/>
            Search
          </button>
        </div>

      </form>


      <div className="main-content">
        <div className="main-content__grid">
          {photoDataResult && photoDataResult.length ? (
            photoDataResult.map((photo, index) => (
              <Card
                key={index}
                photo={photo}
                callFrom="explorer"
                phRepeat={phRepeat[index]}
                dateImported={new Date().getTime()}
              />
            ))
          ) : (
            <div>
              <p>Hola</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
