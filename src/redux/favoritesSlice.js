// src/redux/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload || {};
      // Normalize an id to compare
      const id =
        item?.idFood ??
        item?.id ??
        (typeof item?.title === "string" ? `title:${item.title}` : undefined);
      if (id == null) return;

      const exists = state.favoriteRecipes.find(
        (r) =>
          (r?.idFood ??
            r?.id ??
            (typeof r?.title === "string" ? `title:${r.title}` : undefined)) ===
          id
      );
      if (exists) {
        state.favoriteRecipes = state.favoriteRecipes.filter((r) => r !== exists);
      } else {
        state.favoriteRecipes.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
