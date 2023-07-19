import { IBookmark, TDropdownItem } from '../../types'

export enum ValidActionTypes {
  ChangeBookmarkMainValues = 'CHANGE_BOOKMARK_MAIN_VALUES',
  AddDropdownItem = 'ADD_DROPDOWN_ITEM',
  ChangeDropdownItem = 'CHANGE_DROPDOWN_ITEM',
  DeleteDropdownItem = 'DELETE_DROPDOWN_ITEM',
}

type Action =
  | {
      type: ValidActionTypes.ChangeBookmarkMainValues
      name: string
      value: string
    }
  | {
      type: ValidActionTypes.AddDropdownItem
    }
  | {
      type: ValidActionTypes.ChangeDropdownItem
      id: number
      name: string
      value: string
    }
  | {
      type: ValidActionTypes.DeleteDropdownItem
      id: number
    }

const createDropdownItem = () => {
  return {
    title: '',
    link: '',
    iconUrl: '',
  } as TDropdownItem
}

export const reducer = (state: IBookmark, action: Action): IBookmark => {
  switch (action.type) {
    case ValidActionTypes.ChangeBookmarkMainValues:
      return {
        ...state,
        [action.name]: action.value,
      }

    case ValidActionTypes.AddDropdownItem:{
      const dropdownLinks = state.dropdownLinks ? [...state.dropdownLinks, createDropdownItem()] : [createDropdownItem()]

      return {
        ...state,
        dropdownLinks,
      }}

    case ValidActionTypes.ChangeDropdownItem:
      if (!state.dropdownLinks) return state
      return {
        ...state,
        dropdownLinks: state.dropdownLinks.map((e, i) =>
          i !== action.id
            ? e
            : {
                ...e,
                [action.name]: action.value,
              },
        ),
      }
    case ValidActionTypes.DeleteDropdownItem:
      if (!state.dropdownLinks) return state

      return {
        ...state,
        dropdownLinks: state.dropdownLinks.filter((_, i) => i !== action.id),
      }

    default:
      return state
  }
}
