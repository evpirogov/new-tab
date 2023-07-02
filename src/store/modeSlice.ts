import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'

export const modesSlice = createSlice({
  name: 'modes',
  initialState: {
    editMode: false,
    devMode: false,
  },
  reducers: {
    toggleEditMode: state => {
      state.editMode = !state.editMode
    },
    toggleDevMode: state => {
      state.devMode = !state.devMode
    },
  },
})

export const { toggleEditMode, toggleDevMode } = modesSlice.actions
export const selectMode = (state: RootState) => state.modes

export default modesSlice.reducer
