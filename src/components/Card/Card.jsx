import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import "./Card.css";

//Icons from MUI
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import GetAppIcon from '@mui/icons-material/GetApp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  deleteFavourite,
} from "../../features/favorites/favoritesSlice";
import Modal from "../Modal/Modal";

const Card = (photo) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite);
  const [openModal, setOpenModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourite = favourites.find((item) => item.id === photo.photo.id);
    setIsFavourite(favourite !== undefined);
  }, [favourites, photo]);

  const handleSaveOrDelete = (data) => {
    if (isFavourite) {
      dispatch(deleteFavourite(data.photo.id));
      setIsFavourite(false);
    } else {
      // Save only the necessary data
      const dataToSave = {
        id: data.photo.id,
        description: data.photo.description,
        downloads: data.photo.downloads,
        links: data.photo.links.download,
        img: data.photo.urls.regular,
        likes: data.photo.likes,
        width: data.photo.width,
        height: data.photo.height,
        dateImported: new Date(data.dateImported).toLocaleDateString("es"),
      };
      dispatch(addFavourite(dataToSave));
      setIsFavourite(true);
    }
  };

  const handleDelete = (photo) => {
    dispatch(deleteFavourite(photo.photo.id));
  };

  const handleDownload = () => {
    let urlToDownload;
    if (photo.callFrom === "gallery") {
      urlToDownload = photo.photo.img;
    } else {
      urlToDownload = photo.photo.urls.full;
    }

    saveAs(urlToDownload, `${photo.photo.id}`);
  };

  //Gallery Render
  if (photo.callFrom === "gallery") {
    return (
      <>
        <div className="grid-img-container" key={photo.photo.id}>
          <img
            className="grid-img"
            src={photo.photo.img}
            alt="Img from Unsplash"
          />
          <div className="grid-img__info-icon">
            <DownloadForOfflineIcon
              className="heart-icon"
              sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
              onClick={handleDownload}
            />
            
            <BorderColorIcon
              className="heart-icon"
              sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
              onClick={() => setOpenModal(true)}
            />
            
            {/*<p>{photo.photo.description} </p>*/}
            <HeartBrokenIcon
              className="heart-icon"
              sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
              onClick={() => handleDelete(photo, photo.photo.id)}
            />
            
          </div>
        </div>
        {openModal && <Modal photo={photo} closeModal={setOpenModal} />}
      </>
    );
  } else {
    //Explorer Render
    return (
      <>
        <div className="grid-img-container" key={photo.photo.id}>
          <img
            className="grid-img"
            src={photo.photo.urls.regular}
            alt="Img from Unsplash"
          />
          <div className="grid-img__info-icon">
            {/*<p>
              {photo.photo.description
                ? photo.photo.description
                : photo.photo.alt_description}{" "}
              </p>*/}
            <div className="heart-icon">
              <DownloadForOfflineIcon onClick={handleDownload} 
                sx={{ fontSize: 40, color: "white", cursor: "pointer" }} 
              />
              {/* DownloadForOfflineIcon */}
            </div>

            <div className="heart-icon">
              <FavoriteIcon
                className=""
                sx={{ fontSize: 40, transition: "0s", color: isFavourite ? "red" : "white", cursor: "pointer" }}
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