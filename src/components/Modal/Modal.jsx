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
  const [inputValue, setInputValue] = useState(''); // Nuevo estado para el valor del input
  const dispatch = useDispatch();
  const modalContent = useRef(null); // Agregamos la referencia

  useEffect(() => {
    setDescription(photo.photo.description);
    setInputValue(photo.photo.description); // Actualiza el valor del input cuando cambia la foto
  }, [photo.photo]);

  // Close modal when click out of the modal
  const handleClose = (e) => {
    if (modalContent.current && !modalContent.current.contains(e.target)) {
      closeModal(false);
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Actualiza el valor del input
  };

  const handleEdit = () => {
    dispatch(editDescription({ id: photo.photo.id, desc: inputValue }));
    setDescription(inputValue); // Actualiza la descripción
    closeModal(false);
  };

  const handleDownload = () => {
    let urlToDownload = photo.photo.img;
    saveAs(urlToDownload, `${photo.photo.id}`);
  };

  return (
    <div className="main-modal" onClick={handleClose}>
      <div className="modal-container" ref={modalContent}>
        <div className="close-button-container">
          <button className="close-button" onClick={() => closeModal(false)}>
            <DisabledByDefaultIcon sx={{ fontSize: 42, borderRadius: '30px' }}/>
          </button>
        </div>
        <div className="body" >
          <img src={photo.photo.img} alt="" className="modal-img"/>
          <div className="modal-data">
            <p>
              <DescriptionIcon className="icon-data"/> Edit new description:
            </p>
            <div className="input-modal-container">
              <input
                className="input-modal"
                name="description"
                type="text"
                maxlength="40"
                placeholder={photo.photo.description ? photo.photo.description : "This image has no description"}
                onChange={handleInputChange}
                value={inputValue}
                style={{color: 'black', fontSize: '16px'}}
              />
            </div>
            <div className="edit-button-container">
              <button className="edit-button" onClick={handleEdit}>
                <EditIcon sx={{ fontSize: 20}} className="icon-data"/> Save edit
              </button>
            </div>
              
              
            
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