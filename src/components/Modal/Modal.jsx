import "./Modal.css";
import EditIcon from "@mui/icons-material/Edit";
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
            <button onClick={() => closeModal(false)}>x</button>
          </div>
          <div className="title">
            <h1 className="h1-modal">Photo Information:</h1>
          </div>
          <div className="body">
            <p>
              Full description:
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
            <p>Width: {photo.photo.width}</p>
            <p>Height: {photo.photo.height}</p>
            <p>Likes: {photo.photo.likes}</p>
            <p>Date saved: {photo.photo.dateImported}</p>
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
          <div className="footer">
            <button
              onClick={() => {
                closeModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;