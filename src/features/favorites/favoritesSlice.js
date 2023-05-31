import { createSlice } from "@reduxjs/toolkit";

// Define the initial state: If there is data in local storage in key "collection" use that data
// If not, the initial state is an empty array
const initialState = localStorage.getItem("collection")
  ? JSON.parse(localStorage.getItem("collection"))
  : [];

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    // Add a favourite photo to the state and update local storage
    addFavourite: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("collection", JSON.stringify(state));
    },
    // Remove a favourite photo from the state and update local storage
    deleteFavourite: (state, action) => {
      const newState = state.filter((item) => action.payload !== item.id);
      localStorage.setItem("collection", JSON.stringify(newState));
      return newState;
    },
    // Modify the description of a favourite photo in the state and update local storage
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
export const { addFavourite, deleteFavourite, editDescription } = favouriteSlice.actions;