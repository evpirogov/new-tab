import { ICard, TDropdownItem } from '../../types'

export enum ValidActionTypes {
  ChangeCardMainValues = 'CHANGE_CARD_MAIN_VALUES',
  AddDropdownItem = 'ADD_DROPDOWN_ITEM',
  ChangeDropdownItem = 'CHANGE_DROPDOWN_ITEM',
  DeleteDropdownItem = 'DELETE_DROPDOWN_ITEM',
}

type Action =
  | {
      type: ValidActionTypes.ChangeCardMainValues
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

export const reducer = (state: ICard, action: Action) => {
  switch (action.type) {
    case ValidActionTypes.ChangeCardMainValues:
      return {
        ...state,
        [action.name]: action.value,
      }

    case ValidActionTypes.AddDropdownItem:
      return {
        ...state,
        dropdownLinks: [...state.dropdownLinks, createDropdownItem()],
      }

    case ValidActionTypes.ChangeDropdownItem:
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
      console.log(action.id)

      return {
        ...state,
        dropdownLinks: state.dropdownLinks.filter((_, i) => i !== action.id),
      }

    default:
      return state
  }
}
