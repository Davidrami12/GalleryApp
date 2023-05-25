import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import favoriteReducer from '../features/favorites/favoritesSlice'

// The current Redux application state lives in an object called the store
export const store = configureStore({
    reducer: {
        search: searchReducer,
        favourite: favoriteReducer,
    }
})