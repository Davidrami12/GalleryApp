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
  const searchStatus = useSelector((state) => state.search.status);


  useEffect(() => {
    const favouriteIds = favourites.reduce((acc, fav) => {
      acc[fav.id] = true;
      return acc;
    }, {});

    const repeatPhotosArray = photoDataResult.map((photo) => favouriteIds[photo.id] || false);
    setPhRepeat(repeatPhotosArray);
  }, [photoDataResult, favourites]);

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
          {searchStatus === 'loading' ? (
            // Display Loading component when API request status = loading
            <Loading />
          ) : photoDataResult && photoDataResult.length ? (
            photoDataResult.map((photo, index) => (
              // Show search Card component when data matches a search
              <Card
                key={index}
                photo={photo}
                callFrom="search"
                phRepeat={phRepeat[index]}
                dateImported={new Date().getTime()}
              />
            ))
          ) : (
            // Show when there is no input to search
            <div className="loading">
              <p>No images to display</p>
              <p>Search something!</p>
              <img className="no-image" src={noImage} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
