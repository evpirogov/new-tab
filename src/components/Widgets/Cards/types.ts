export type TDropdownItem = {
  title: string
  link: string
  iconUrl: string
}

export interface ICard {
  id: string
  mainHref: string | undefined
  mainImageUrl: string | undefined
  mainImageSize: string | undefined
  dropdownLinks: TDropdownItem[]
}
