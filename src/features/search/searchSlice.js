import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk(
  "photos/getPhotos",

  async ({ value }) => {
    const API_KEY = "f3_j5xaaagLteInPGf7sUqRFgJc8ulftP1UGe1ulBi0";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${value}&per_page=18`;
    const URL_RANDOM = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=18`;

    if (value && value !== "") {
      const response = await fetch(URL);
      const data = await response.json();
      return [...data.results];

    } else {
      const response = await fetch(URL_RANDOM);
      const data = await response.json();
      return [...data];
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    photos: [],
    status: 'idle',
  },
  extraReducers: {
    [getPhotos.pending] : (state) => {
        state.status = 'pending';
        console.log('Loading')
    },
    [getPhotos.fulfilled] : (state, action) => {
        state.photos = action.payload;
        state.status = 'fulfilled';
    },
    [getPhotos.rejected] : (state) => {
        state.status = 'rejected';
        console.log ('Error while fetching data from API ')
    }
  },
});

export default searchSlice.reducer;
export const selectPhotos = (state) => state.search.photos;