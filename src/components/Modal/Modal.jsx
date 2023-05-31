import "./Modal.css";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import PanoramaVerticalIcon from '@mui/icons-material/PanoramaVertical';
import PanoramaHorizontalIcon from '@mui/icons-material/PanoramaHorizontal';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { editDescription } from "../../features/favorites/favoritesSlice";
import { useDispatch } from "react-redux";

import { saveAs } from "file-saver";
import { useEffect, useState, useRef } from "react";

const Modal = ({ photo, closeModal }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const modalContentEl = useRef(null); // Agregamos la referencia

  useEffect(() => {
    setDescription(photo.photo.description);
  }, [photo.photo]);

  // Close modal when click out of the modal
  const handleClose = (e) => {
    if (modalContentEl.current && !modalContentEl.current.contains(e.target)) {
      closeModal(false);
    }
  }

  const handleDownload = () => {
    let urlToDownload = photo.photo.img;
    saveAs(urlToDownload, `${photo.photo.id}`);
  };

  const handleEdit = (e) => {
    const desc = e.target.value;
    dispatch(editDescription({ id: photo.photo.id, desc }));
  };

  return (
    <div className="main-modal" onClick={handleClose}>
      <div className="modal-container" ref={modalContentEl}>
        <div className="close-button-container">
          <button className="close-button" onClick={() => closeModal(false)}>
            <DisabledByDefaultIcon sx={{ fontSize: 42, borderRadius: '25px' }}/>
          </button>
        </div>
        <div className="body" >
          <img src={photo.photo.img} alt="" className="modal-img"/>
          <div className="modal-data">
            <p>
              <DescriptionIcon className="icon-data"/> Edit Description:
              <input
                className="input-modal"
                name="description"
                type="text"
                maxlength="50"
                placeholder={
                  photo.photo.description
                    ? photo.photo.description
                    : "No description added for this image"
                }
                onChange={handleEdit}
                value={description}
                style={{color: 'black', fontSize: '16px'}}
              />
              <button>
                <EditIcon className="icon-data" style={{ cursor: "pointer" }}/>
                Edit
              </button>
              
            </p>
            <p><PanoramaHorizontalIcon className="icon-data"/> Width: {photo.photo.width}px</p>
            <p><PanoramaVerticalIcon className="icon-data"/> Height: {photo.photo.height}px</p>
            <p><FavoriteBorderIcon className="icon-data"/> Likes: {photo.photo.likes}</p>
            <p><DateRangeIcon className="icon-data"/> Date saved: {photo.photo.dateImported}</p>
            <p
              style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
              onClick={() => handleDownload()}>
              <GetAppIcon className="icon-data"/> Download image
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;