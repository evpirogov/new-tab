import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IBookmark } from '../components/Widgets/Bookmarks/types'
import type { RootState } from '.'

const initialState: IBookmark[] = []

export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<IBookmark>) => {
      const id = Math.random().toString(32).substring(2)
      state.push({ ...action.payload, id })
    },
    editBookmark: (state, action: PayloadAction<IBookmark>) => {
      const bookmark = action.payload
      return state.map(e => (e.id === bookmark.id ? bookmark : e))
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      const bookmarkId = action.payload
      return state.filter(e => e.id !== bookmarkId)
    },
  },
})

export const { addBookmark, editBookmark, removeBookmark } = bookmarkSlice.actions
export const selectBookmarks = (state: RootState) => state.bookmarks

export default bookmarkSlice.reducer
