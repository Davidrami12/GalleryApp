import "./Modal.css";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import { editDescription } from "../../features/favorites/favoritesSlice";
import { useDispatch } from "react-redux";

//import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

const Modal = ({ photo, closeModal }) => {
  // const [downloadUrl, setDownloadUrl] = useState("");
  // const [openEdit, setOpenEdit] = useState(false);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(photo.photo.description);
  }, [photo.photo]);

  const downloadPhoto = (id) => {
    //saveAs(photo.photo.img, `${id}.jpg`);
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
          <div className="title">
            <h1 className="h1-modal">Photo Information:</h1>
          </div>
          <div className="body">
            <p>
               <DescriptionIcon/> Description:
              <input
                className="input-modal"
                name="description"
                type="text"
                placeholder={
                  photo.photo.description
                    ? photo.photo.description
                    : "Add a description"
                }
                onChange={handleEdit}
                value={description}
                style={{padding: '5px 0'}}
              />
              <EditIcon style={{ cursor: "pointer" }} />
            </p>
            <p>Width: {photo.photo.width}px</p>
            <p>Height: {photo.photo.height}px</p>
            <p><FavoriteBorderIcon/> Likes: {photo.photo.likes}</p>
            <p><DateRangeIcon/> Date saved: {photo.photo.dateImported}</p>
            <p
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
              }}
              onClick={() => downloadPhoto(photo.photo.description)}
            >
              Download ⬇️
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;