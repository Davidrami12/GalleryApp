import React, { useState, useEffect } from "react";
import "./Search.css";
import noImage from "../../assets/no-image.png";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos, selectPhotos } from "../../features/search/searchSlice";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

export const Search = () => {
  const [phRepeat, setPhRepeat] = useState([]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const photoDataResult = useSelector(selectPhotos);
  const favourites = useSelector((state) => state.favourite);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPhotos({ value: value }));
  };

  return (
    <div className="search-container">
      <form id="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="icon-container">
            <SearchIcon sx={{ fontSize: 28 }} />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Explore images..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="submit-button">
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
            <div className="loading">
              <p>No images to display</p>
              <p>Search something!</p>
              <Loading />
              <img className="no-image" src={noImage} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
