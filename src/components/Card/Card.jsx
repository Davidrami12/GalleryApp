//Icons from MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import PanoramaVerticalIcon from '@mui/icons-material/PanoramaVertical';
import PanoramaHorizontalIcon from '@mui/icons-material/PanoramaHorizontal';

// Components
import { Notification } from "../Notification/Notification";
import Modal from "../Modal/Modal";
import "./Card.css";

// Imports
import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../../features/favorites/favoritesSlice";

const Card = (photo) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite);
  const [openModal, setOpenModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  // Effect to update isFavorite when favorites or photo changes
  useEffect(() => {
    const favourite = favourites.find((item) => item.id === photo.photo.id);
    setIsFavourite(favourite !== undefined);
  }, [favourites, photo]);

  const handleSaveOrDelete = (data) => {
    if (isFavourite) {
      dispatch(deleteFavorite(data.photo.id));
      setIsFavourite(false);
      Notification("Image removed from favorites", "info");
    } else {
      // Save only the necessary data
      const dataToSave = {
        id: data.photo.id,
        description: data.photo.alt_description,
        links: data.photo.links.download,
        img: data.photo.urls.regular,
        likes: data.photo.likes,
        width: data.photo.width,
        height: data.photo.height,
        dateImported: new Date(data.dateImported).toLocaleDateString("es"),
      };
      dispatch(addFavorite(dataToSave));
      setIsFavourite(true);
      Notification("Image added to favorites!", "success");
    }
  };

  const handleDelete = (photo) => {
    dispatch(deleteFavorite(photo.photo.id));
    Notification("Image removed from favorites", "info");
  };

  const handleDownload = () => {
    let urlToDownload;
    if (photo.callFrom === "favorites") {
      urlToDownload = photo.photo.img;
    } else {
      urlToDownload = photo.photo.urls.full;
    }

    saveAs(urlToDownload, `${photo.photo.id}`);
  };

  // Return component rendering for Favorites
  if (photo.callFrom === "favorites") {
    const description = photo.photo.description ? photo.photo.description.charAt(0).toUpperCase() + photo.photo.description.slice(1) : "";

    return (
      <>
        <div className="grid-img-container" key={photo.photo.id}>
          <img
            className="grid-img-favorites"
            src={photo.photo.img}
            alt=""
          />
          <div className="grid-img__favs-icon">
            <div className="icons">
              <DownloadForOfflineIcon
                sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
                onClick={handleDownload}/>
            </div>
            <div className="icons">
              <BorderColorIcon
                sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
                onClick={() => setOpenModal(true)}/>
              </div>
            <div className="icons">
            <HeartBrokenIcon
              sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
              onClick={() => handleDelete(photo, photo.photo.id)}/>
            </div>
          </div>

          <div className="img-data">
            <p><PanoramaHorizontalIcon className="icon-data"/> <u>Width:</u> {photo.photo.width}px</p>
            <p><PanoramaVerticalIcon className="icon-data"/> <u>Height:</u> {photo.photo.height}px</p>
            <p><FavoriteBorderIcon className="icon-data"/> <u>Likes:</u> {photo.photo.likes}</p>
            <p><DateRangeIcon className="icon-data"/> <u>Date saved:</u> {photo.photo.dateImported}</p>
            <p><DescriptionIcon className="icon-data"/> {description ? description : "This image has no description"}</p>
          </div>
          
        </div>
        
        {openModal && <Modal photo={photo} closeModal={setOpenModal} />}
      </>
    );
  } else {
    // Return component rendering for Search
    return (
      <>
        <div className="grid-img-container" key={photo.photo.id}>
          <img
            className="grid-img-search"
            src={photo.photo.urls.regular}
            alt=""
          />
          <div className="grid-img__info-icon">
            <div className="icons">
              <DownloadForOfflineIcon onClick={handleDownload} 
                sx={{ fontSize: 40, color: "white", cursor: "pointer" }} 
              />
            </div>

            <div className="icons">
              <FavoriteIcon
                sx={{ fontSize: 40, color: isFavourite ? "red" : "white", cursor: "pointer" }}
                onClick={() => {
                  handleSaveOrDelete(photo);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Card;