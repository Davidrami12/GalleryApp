import "./Favorites.css";

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
  const [gallery, setGallery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const favourites = useSelector((state) => state.favourite);

  useEffect(() => {
    setGallery(favourites);
  }, [favourites]);

  const handleSelect = (e) => {
    if (e.target.value === "date") {
      setOrderBy("date");
    } else if (e.target.value === "width") {
      setOrderBy("width");
    } else if (e.target.value === "height") {
      setOrderBy("height");
    } else if (e.target.value === "likes") {
      setOrderBy("likes");
    }
  };

  useEffect(() => {
    let filteredPhotos;
    if (searchTerm.length) {
      filteredPhotos = favourites.filter(
        (p) =>
          p.description &&
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filteredPhotos = favourites;
    }
    const arrOrderedPhotos = [...filteredPhotos];

    switch (orderBy) {
      case "width":
        arrOrderedPhotos.sort((a, b) => a.width - b.width);
        break;
      case "height":
        arrOrderedPhotos.sort((a, b) => a.height - b.height);
        break;
      case "likes":
        arrOrderedPhotos.sort((a, b) => a.likes - b.likes);
        break;
      case "date":
        arrOrderedPhotos.sort((a, b) => a.date - b.date);
      break;
      default:
      break;
    }
    setGallery(arrOrderedPhotos);
  }, [searchTerm, orderBy, favourites]);

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
              placeholder="Search by descriptions"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="order-favs">
          <select
            className="select"
            
            onChange={handleSelect}> ORDER BY
              <option value="date">By date</option>
              <option value="width">By width</option>
              <option value="height">By height</option>
              <option value="likes">By likes</option>
          </select>
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
              <p>Add from <Link to="/search">Search</Link> </p>
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};