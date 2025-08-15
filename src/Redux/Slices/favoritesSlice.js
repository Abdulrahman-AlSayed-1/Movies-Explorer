import { createSlice } from "@reduxjs/toolkit";
/**
 * This slice manages the favorites state in the Redux store.
 * It allows adding and removing favorite items by their IDs.
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favorites')) || [], // Load favorites from localStorage or initialize as an empty array
  reducers: {
    addFavorite: (state, action) => {
        // Check if the item is already in the favorites
        if (!state.some((favorite) => favorite.id === action.payload.id)) {
            state.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state));
        }

    },
    removeFavorite: (state, action) => { 
         // Remove the item from favorites
       const filtered = state.filter((target) => target.id !== action.payload.id);
       localStorage.setItem('favorites', JSON.stringify(filtered));
       return filtered; // Return the new state
    },
  },
});

export const { addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
