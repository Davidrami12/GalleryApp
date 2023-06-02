// Icons from MUI
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import EditNoteIcon from '@mui/icons-material/EditNote';

// Imports
import { editDescription } from "../../features/favorites/favoritesSlice";
import { useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import { useEffect, useState, useRef } from "react";
import "./Modal.css";

const Modal = ({ photo, closeModal }) => {
  const [description, setDescription] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const modalContent = useRef(null);

  // Updating description and input value when the photo prop changes
  useEffect(() => {
    setDescription(photo.photo.description);
    setInputValue(photo.photo.description);
  }, [photo.photo]);

  // Close modal when clicking outside of it
  const handleClose = (e) => {
    if (modalContent.current && !modalContent.current.contains(e.target)) {
      closeModal(false);
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEdit = () => {
    dispatch(editDescription({ id: photo.photo.id, desc: inputValue }));
    setDescription(inputValue);
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
            <div className="old-description">
              <p>
                <DescriptionIcon className="icon-data"/> <u>Current description:</u>
              </p>
              <p>
                {photo.photo.description && photo.photo.description.charAt(0).toUpperCase() + photo.photo.description.slice(1)} 
              </p>
            </div>
            <div className="new-description">
              <p>
                <EditNoteIcon className="icon-data"/> <u>New description:</u>
              </p>
              <div className="input-modal-container">
                <input
                  className="input-modal"
                  name="description"
                  type="text"
                  maxLength="80"
                  onChange={handleInputChange}
                  placeholder="Enter description for this image"
                />
              </div>
              <div className="edit-button-container">
                <button className="edit-button" onClick={handleEdit}>
                  <SaveAsIcon sx={{ fontSize: 22}} className="icon-data"/> Save edit
                </button>
              </div>
            </div>
            <div className="download-button-container">
              <button button className="download-button" onClick={() => handleDownload()}>
                <GetAppIcon className="icon-data"/> Download image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;