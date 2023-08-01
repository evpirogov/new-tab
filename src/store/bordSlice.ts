import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { changeElementPositionInArray, generateRandomId } from '../utils'

type TStatus = {
  label: string
  value: string
  color: string
}

type TPriority = {
  label: string
  value: string
  color: string
}

type TEpic = {
  label: string
  value: string
  colorScheme: {
    mainColor: string
    secondColor: string
  }
}

export type TBoardCard = {
  id: string
  status: string
  priority: string
  description: string
  epic: string | null
}

export type TMoveParams = {
  targetType: string
  targetId: string
  cardId: string
}

type TBoard = {
  statuses: TStatus[]
  epics: TEpic[]
  cards: TBoardCard[]
  priorities: TPriority[]
}

const initialState: TBoard = {
  cards: [
    {
      id: 'hasd8f',
      status: 'idea',
      priority: 'normal',
      description:
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',
      epic: 'someEpic',
    },
    {
      id: 'l42lk4',
      status: 'todo',
      priority: 'major',
      description: 'Какое-то другое описание Lorem Ipsum.',
      epic: 'someAnotherEpic',
    },
    {
      id: 'f3qd23',
      status: 'todo',
      priority: 'critical',
      description: 'Какое-то другое описание Lorem Ipsum.',
      epic: 'someEpic',
    },
  ],
  epics: [
    {
      label: 'Some epic',
      value: 'someEpic',
      colorScheme: {
        mainColor: 'red',
        secondColor: 'pink',
      },
    },
    {
      label: 'Some another epic',
      value: 'someAnotherEpic',
      colorScheme: {
        mainColor: 'royalblue',
        secondColor: 'lightblue',
      },
    },
  ],
  statuses: [
    {
      label: 'Idea',
      value: 'idea',
      color: '#ea4336',
    },
    {
      label: 'To do',
      value: 'todo',
      color: '#4285f4',
    },
    {
      label: 'In progress',
      value: 'in_progress',
      color: '#fabd05',
    },
    {
      label: 'Done',
      value: 'done',
      color: '#33a853',
    },
  ],
  priorities: [
    {
      label: 'Normal',
      value: 'normal',
      color: '#4285f4',
    },
    {
      label: 'Major',
      value: 'major',
      color: '#fabd05',
    },
    {
      label: 'Critical',
      value: 'critical',
      color: '#ea4336',
    },
  ],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addCard: (state, { payload }: PayloadAction<TBoardCard>) => {
      const id = generateRandomId()
      state.cards.push({ ...payload, id })
    },
    editCard: (state, { payload }: PayloadAction<TBoardCard>) => {
      state.cards = state.cards.map(e => (e.id === payload.id ? payload : e))
    },
    deleteCard: (state, { payload }: PayloadAction<string>) => {
      state.cards = state.cards.filter(e => e.id !== payload)
    },
    moveCard: (state, { payload }: PayloadAction<TMoveParams>) => {
      const { targetType, targetId, cardId } = payload

      switch (targetType) {
        case 'column':
          state.cards = state.cards.map(e =>
            e.id === cardId ? { ...e, status: targetId } : e,
          )
          break

        case 'cardBefore':
          {
            const targetIndex = state.cards.findIndex(e => e.id === targetId)
            const currentIndex = state.cards.findIndex(e => e.id === cardId)
            state.cards = changeElementPositionInArray<TBoardCard>(
              state.cards,
              currentIndex,
              targetIndex,
            )
          }
          break

        case 'cardAfter':
          {
            const targetIndex =
              state.cards.findIndex(e => e.id === targetId) + 1
            const currentIndex = state.cards.findIndex(e => e.id === cardId)
            state.cards = changeElementPositionInArray<TBoardCard>(
              state.cards,
              currentIndex,
              targetIndex,
            )
          }
          break

        default:
          return state
      }
    },
  },
})

export const { addCard, editCard, deleteCard, moveCard } = boardSlice.actions
export const selectBoard = (state: RootState) => state.board
export const selectEpic = (state: RootState, epicName: string | null) =>
  epicName === null ? null : state.board.epics.find(e => e.value === epicName)
export const selectPriority = (state: RootState, priorityName: string | null) =>
  priorityName === null
    ? null
    : state.board.priorities.find(e => e.value === priorityName)
export const selectColumnCards = (state: RootState, status: string) =>
  state.board.cards.filter(e => e.status === status)
export const selectCardById = (state: RootState, cardId: string) =>
  state.board.cards.find(e => e.id === cardId)

export default boardSlice.reducer
