import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

type TColumn = {
  label: string
  name: string
  color: string
}

type TEpic = {
  label: string
  name: string
  colorScheme: {
    mainColor: string
    secondColor: string
  }
}

type TCard = {
  id: string
  status: 'idea' | 'todo' | 'in_progress' | 'done'
  priority: 'normal' | 'major' | 'critical'
  description: string
  epic: string | null
}

type TBoard = {
  columns: TColumn[]
  epics: TEpic[]
  cards: TCard[]
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
      id: 'hasd8f',
      status: 'todo',
      priority: 'major',
      description: 'Какое-то другое описание Lorem Ipsum.',
      epic: 'someAnotherEpic',
    },
  ],
  epics: [
    {
      label: 'Some epic',
      name: 'someEpic',
      colorScheme: {
        mainColor: 'red',
        secondColor: 'pink',
      },
    },
    {
      label: 'Some another epic',
      name: 'someAnotherEpic',
      colorScheme: {
        mainColor: 'royalblue',
        secondColor: 'lightblue',
      },
    },
  ],
  columns: [
    {
      label: 'Idea',
      name: 'idea',
      color: '#ea4336',
    },
    {
      label: 'To do',
      name: 'todo',
      color: '#4285f4',
    },
    {
      label: 'In progress',
      name: 'in_progress',
      color: '#fabd05',
    },
    {
      label: 'Done',
      name: 'done',
      color: '#33a853',
    },
  ],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
})

export const {} = boardSlice.actions
export const selectBoard = (state: RootState) => state.drag

export default boardSlice.reducer
