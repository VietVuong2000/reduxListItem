import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Photo } from '../../interfaces/itfList'

export interface CounterState {
  value: number
}

const initialState: any = {
  albums : [],
  newAlbums: []
}

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
  
    getalbum: (state, action: any) => {
      state.albums = action.payload    
    },
    getNewAblum(state, action: any) {
      state.newAlbums = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getalbum, getNewAblum } = albumSlice.actions

export default albumSlice.reducer