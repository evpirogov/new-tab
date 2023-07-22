export type TDropdownItem = {
  title: string
  link: string
  iconUrl: string
}

export interface IBookmark {
  id: string
  mainHref: string
  mainImageUrl: string
  mainImageSize: string
  dropdownLinks: TDropdownItem[] | null
}
