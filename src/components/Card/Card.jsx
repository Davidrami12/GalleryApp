import React, { useState } from "react";
import "./Card.css";

//Icons from MUI
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

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

  const handleSave = (data) => {
    let sw = false;

    for (let index = 0; index < favourites.length; index++) {
      if (favourites[index].id === data.photo.id) {
        sw = true;
      }
    }

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

  const changeIcon = (e) => {
    e.target.style.color = "#ED5A6B";
    e.target.style.cursor = "default";
    e.target.style.transition = "all ease 1s";
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
          <div className="grid-img__icons">
            <InfoIcon
              style={{ color: "FFFFFF", cursor: "pointer" }}
              onClick={() => setOpenModal(true)}
            />
            <p>{photo.photo.description} </p>
            <DeleteIcon
              style={{ color: "FFFFFF", cursor: "pointer" }}
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
            <p>
              {photo.photo.description
                ? photo.photo.description
                : photo.photo.alt_description}{" "}
            </p>

            <div>
              {photo.phRepeat === true ? (
                <FavoriteIcon style={{ color: "#ED5A6B" }} />
              ) : (
                <FavoriteIcon
                  style={{ color: "white", cursor: "pointer" }}
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