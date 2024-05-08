import { createSlice } from "@reduxjs/toolkit";


//this url object will have images path, posters path
//genres will have values like comedy, action, drama and each genre will have unique id or url
const initialState = {
   url: {},
   genres: {}
}


export const homeSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {
       getApiConfiguration: (state, action) => {
          state.url = action.payload;
       },
       getGenres: (state, action) => {
         state.genres = action.payload;
       }   
   }  
})


export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;