import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("collection")
  ? JSON.parse(localStorage.getItem("collection"))
  : [];

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("collection", JSON.stringify(state));
    },
    deleteFavourite: (state, action) => {
      const newState = state.filter((item) => action.payload !== item.id);
      localStorage.setItem("collection", JSON.stringify(newState));
      return newState;
    },
    editDescription: (state, action) => {
      const copyStatePhotos = [...state];
      const editIndex = copyStatePhotos.findIndex(
        (photo) => photo.id === action.payload.id
      );
      const newPhoto = {
        ...copyStatePhotos[editIndex],
        description: action.payload.desc,
      };
      copyStatePhotos[editIndex] = newPhoto;
      state = copyStatePhotos;
      localStorage.setItem("collection", JSON.stringify(state));
      return state;
    },
  },
});

export default favouriteSlice.reducer;
export const { addFavourite, deleteFavourite, editDescription } =
  favouriteSlice.actions;