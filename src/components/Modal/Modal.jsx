import "./Modal.css";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import PanoramaVerticalIcon from '@mui/icons-material/PanoramaVertical';
import PanoramaHorizontalIcon from '@mui/icons-material/PanoramaHorizontal';

import { editDescription } from "../../features/favorites/favoritesSlice";
import { useDispatch } from "react-redux";

import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

const Modal = ({ photo, closeModal }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(photo.photo.description);
  }, [photo.photo]);

  const downloadPhoto = (id) => {
    saveAs(photo.photo.img, `${id}.jpg`);
  };

  const handleEdit = (e) => {
    const desc = e.target.value;
    dispatch(editDescription({ id: photo.photo.id, desc }));
  };

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}><CloseIcon/></button>
          </div>
          <div className="body">
            <img src={photo.photo.img} alt="" 
                style={{height: '360px',
                width: '360px',
                maxWidth: '100%',
                aspectRatio: '1',
                objectFit: 'cover',
                objectPosition: 'center center',
                borderRadius: '20px'}}/>
            <p>
               <DescriptionIcon/> Description:
              <input
                className="input-modal"
                name="description"
                type="text"
                placeholder={
                  photo.photo.description
                    ? photo.photo.description
                    : "No description added for this image"
                }
                onChange={handleEdit}
                value={description}
                style={{padding: '5px 0'}}
              />
              <EditIcon style={{ cursor: "pointer" }} /> Edit
            </p>
            <p><PanoramaHorizontalIcon/> Width: {photo.photo.width}px</p>
            <p><PanoramaVerticalIcon/> Height: {photo.photo.height}px</p>
            <p><FavoriteBorderIcon/> Likes: {photo.photo.likes}</p>
            <p><DateRangeIcon/> Date saved: {photo.photo.dateImported}</p>
            <p
              style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
              onClick={() => downloadPhoto(photo.photo.description)}>
              <GetAppIcon/> Download
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;