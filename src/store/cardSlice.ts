import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ICard } from '../components/Widgets/Cards/types'
import type { RootState } from '.'

const initialState: ICard[] = []

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<ICard>) => {
      const id = Math.random().toString(32).substring(2)
      state.push({ ...action.payload, id })
    },
    editCard: (state, action: PayloadAction<ICard>) => {
      const card = action.payload
      return state.map(e => (e.id === card.id ? card : e))
    },
    removeCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload
      return state.filter(e => e.id !== cardId)
    },
  },
})

export const { addCard, editCard, removeCard } = cardsSlice.actions
export const selectCards = (state: RootState) => state.cards

export default cardsSlice.reducer
