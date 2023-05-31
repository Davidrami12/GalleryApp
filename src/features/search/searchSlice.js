import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async action that will call the Unsplash API returning a promise
export const getPhotos = createAsyncThunk(
  "photos/getPhotos",

  async ({ value }, { errorFetch }) => {
    try {
      const API_KEY = "lReeBLBs6T5IndOJkM7ptm4_2wBaK6re5Bb32GKhIzo";
      const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${value}&per_page=24`;
      const URL_RANDOM_IMAGES = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=18`;

      // If value provided is ok fetch data related to the value from the API
      if (value && value !== "") {
        const response = await fetch(URL);
        const data = await response.json();
        return [...data.results];
      } else {
        // Auto generate random images when data is null
        const response = await fetch(URL_RANDOM_IMAGES);
        const data = await response.json();
        return [...data];
      }
    } catch (err) {
      return errorFetch(err.message);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    photos: [],
    status: 'idle',
  },
  // Updating the status depending on the async API response
  extraReducers: {
    [getPhotos.pending] : (state) => {
      state.status = 'pending';
      console.log('Loading')
    },
    [getPhotos.fulfilled] : (state, action) => {
      state.photos = action.payload;
      state.status = 'fulfilled';
      console.log('Fulfilled')
    },
    [getPhotos.rejected] : (state, action) => {
      state.status = 'rejected';
      console.log ('Error while fetching data from API: ', action.payload)
    }
  },
});

export default searchSlice.reducer;
export const selectPhotos = (state) => state.search.photos;