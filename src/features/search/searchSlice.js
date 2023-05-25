// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Creating an async fetch function
export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",

  async ({ query }) => {
    const API_KEY = "lReeBLBs6T5IndOJkM7ptm4_2wBaK6re5Bb32GKhIzo";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${query}&per_page=50`;
    const URL_RANDOM_SEARCH = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=30`;

    // If no search input, I generate a random list of images
    if (query && query !== "") {
      const response = await fetch(URL);
      const data = await response.json();
      return [...data.results];
    } else {
      const response = await fetch(URL_RANDOM_SEARCH);
      const data = await response.json();
      return [...data];
    }
  }
);

// Checking the status of the promise. When fulfilled: the images array will be populated
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    images: [],
  },
  extraReducers: {
    [fetchPhotos.pending]: () => {
      console.log("Loading...");
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      console.log("Loading completed!");
      state.images = action.payload;
    },
    [fetchPhotos.rejected]: () => {
      console.log("Failure while fetching the requested data!");
    },
  },
});

export default searchSlice.reducer;
export const selectImages = (state) => state.searchImages.images;