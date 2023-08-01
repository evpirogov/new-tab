import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

export type TElementPosition = {
  x: number
  y: number
}
export type TElementSize = {
  width: number
  height: number
}

export type TDragCandidate = {
  type: string
  id: string
  position: TElementPosition
  clickCoords: TElementPosition
  size: TElementSize
}

export type TAvatar = {
  position: TElementPosition
}

type TDrag = {
  dragInProgress: boolean
  dragCandidate: TDragCandidate | null
  avatar: TAvatar | null
}

const initialState: TDrag = {
  dragInProgress: false,
  avatar: null,
  dragCandidate: null,
}

export const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setDragCandidate: (state, action: PayloadAction<TDragCandidate>) => {
      return { ...state, dragCandidate: action.payload }
    },
    setAvatar: (state, action: PayloadAction<TAvatar>) => {
      state.dragInProgress = true
      state.avatar = action.payload
    },
    setAvatarPosition: (state, action: PayloadAction<TElementPosition>) => {
      if (!state.avatar) return
      state.avatar.position = action.payload
    },
    completeDrag: state => {
      state = {
        dragInProgress: false,
        avatar: null,
        dragCandidate: null,
      }
      return state
    },
  },
})

export const { setDragCandidate, setAvatar, setAvatarPosition, completeDrag } =
  dragSlice.actions
export const selectDrag = (state: RootState) => state.drag
export const selectDragCandidate = (state: RootState) =>
  state.drag.dragCandidate

export default dragSlice.reducer
