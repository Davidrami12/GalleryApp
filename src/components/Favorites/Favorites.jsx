import "./Favorites.css";
import noImage from "../../assets/no-image.png";

import { Link } from "react-router-dom";

//Components import
import Card from "../Card/Card";

//Icons from MUI
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SearchIcon from "@mui/icons-material/Search";


//Redux
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const favourites = useSelector((state) => state.favourite);

  const handleSelect = (e) => {
    setOrderBy(e.target.value);
  };

  let gallery = [...favourites];

  if (searchTerm.length) {
    gallery = gallery.filter(
      (p) =>
        p.description &&
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter fav images
  switch (orderBy) {
    case "width":
      gallery.sort((a, b) => b.width - a.width);
      break;
    case "height":
      gallery.sort((a, b) => b.height - a.height);
      break;
    case "likes":
      gallery.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      gallery.sort((a, b) => b.date - a.date);
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select-filter"
              onChange={handleSelect}> order by
                <option value="width">By width</option>
                <option value="height">By height</option>
                <option value="likes">By likes</option>
                <option value="date">By date</option>
            </select>
          </div>
        </div>
      </div>



      <div className="main-content">
        <div className="main-content__grid">
          {gallery && gallery.length ? (
            gallery.map((photo, index) => (
              <Card photo={photo} callFrom="gallery" key={index} />
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