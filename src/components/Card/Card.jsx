import React, { useState } from "react";
import { saveAs } from 'file-saver';
import "./Card.css";

//Icons from MUI
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from "@mui/icons-material/Info";
import GetAppIcon from '@mui/icons-material/GetApp';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  deleteFavourite,
} from "../../features/favorites/favoritesSlice";
import Modal from "../Modal/Modal";

const Card = (photo) => {
  const dispatch = useDispatch(); // dispatch ejecuta el método para el store
  const favourites = useSelector((state) => state.favourite);
  const [openModal, setOpenModal] = useState(false);

  const handleSave = (data) => {
    let sw = false;

    for (let index = 0; index < favourites.length; index++) {
      if (favourites[index].id === data.photo.id) {
        sw = true;
      }
    }

    // Save only the necessary data
    const dataToSave = {
      id: data.photo.id,
      description: data.photo.description,
      downloads: data.photo.downloads,
      likes: data.photo.likes,
      links: data.photo.links.download,
      height: data.photo.height,
      img: data.photo.urls.regular,
      width: data.photo.width,
      dateImported: new Date(data.dateImported).toLocaleDateString("es"),
    };

    if (sw === false) {
      dispatch(addFavourite(dataToSave));
    }
  };

  const handleDelete = (photo) => {
    dispatch(deleteFavourite(photo.photo.id));
  };

  const handleDownload = () => {
    let urlToDownload;
    if (photo.callFrom === "gallery") {
      // En "Gallery Render", usa 'photo.photo.img'
      urlToDownload = photo.photo.img;
    } else {
      // En "Explorer Render", usa 'photo.photo.urls.full'
      urlToDownload = photo.photo.urls.full;
    }
  
    saveAs(urlToDownload, `${photo.photo.id}`);
  };

  const changeIcon = (e) => {
    e.target.style.color = "red";
    e.target.style.cursor = "default";
    e.target.style.transition = "all ease 0.5s";
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
            <GetAppIcon
              className="heart-icon"
              sx={{ fontSize: 40, color: "white", cursor: "pointer" }}
              onClick={handleDownload}
            />
            
            <BorderColorIcon
              className="heart-icon"
              sx={{ fontSize: 40, color: "#82B1FF", cursor: "pointer" }}
              onClick={() => setOpenModal(true)}
            />
            
            {/*<p>{photo.photo.description} </p>*/}
            <DeleteIcon
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
              <GetAppIcon onClick={handleDownload} sx={{ fontSize: 40, color: "white", cursor: "pointer" }} />
              {/* DownloadForOfflineIcon */}
            </div>

            <div className="heart-icon">
              {photo.phRepeat === true ? (
                <FavoriteIcon className="" sx={{ fontSize: 40 }} style={{ color: "red" }} />
              ) : (
                <FavoriteIcon className=""
                sx={{ fontSize: 40 }} style={{ color: "white", cursor: "pointer" }}
                  onClick={(e) => {
                    handleSave(photo, photo.photo.id);
                    changeIcon(e);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Card;