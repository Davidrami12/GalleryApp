import "./Favorites.css";
import noImage from "../../assets/no-image.png";

import { Link } from "react-router-dom";

//Components import
import Card from "../Card/Card";

//Icons from MUI
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//Redux
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const favourites = useSelector((state) => state.favourite);

  const handleSelect = (event) => {
    setOrderBy(event.target.value);
  };

  let favoritesImages = [...favourites];

  if (searchTerm.length) {
    favoritesImages = favoritesImages.filter(
      (p) =>
        p.description &&
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter fav images
  switch (orderBy) {
    case "width":
      favoritesImages.sort((a, b) => b.width - a.width);
      break;
    case "height":
      favoritesImages.sort((a, b) => b.height - a.height);
      break;
    case "likes":
      favoritesImages.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      favoritesImages.sort((a, b) => b.date - a.date);
      break;
  }

  return (
    <div className="favorites-container">
      <div className="search-favs">
        <div id="search-form">
          <div className="input-group">
            <div className="icon-container">
              <SearchIcon sx={{ fontSize: 28 }} />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search descriptions"
              maxLength={25}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/*<select
              className="select-filter"
              onChange={handleSelect}>
                <option value="width">By width</option>
                <option value="height">By height</option>
                <option value="likes">By likes</option>
                <option value="date">By date</option>
              </select>*/}
              <div className="select-container">
                <FormControl size='small' sx={{minWidth: 100}} className="select-filter">
                  <InputLabel id="filter-label">Filter</InputLabel>
                  <Select
                  MenuProps={{ disableScrollLock: true }} 
                    labelId="filter-label"
                    label="filter"
                    onChange={handleSelect}
                  >
                    <MenuItem value='date' className="options">By date</MenuItem>
                    <MenuItem value='width' className="options">By width</MenuItem>
                    <MenuItem value='height' className="options">By height</MenuItem>
                    <MenuItem value='likes' className="options">By likes</MenuItem>
                  </Select>
                </FormControl>
              </div>
            
          </div>
        </div>
      </div>



      <div className="main-content">
        <div className="main-content__grid">
          {favoritesImages && favoritesImages.length ? (
            favoritesImages.map((photo, index) => (
              <Card photo={photo} callFrom="favorites" key={index} />
            ))
          ) : (
            <div className="loading">
              <p>No images added to favorites yet</p>
              <p>Add from <Link to="/search"><SearchIcon className="icon-data"/>Search</Link></p>
              <img className="no-image" src={noImage} alt="" />
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};