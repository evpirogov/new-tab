export type TOption = {
  title: string
  value: string
}
export type TCustomSelectProps = {
  name: string
  selected: TOption | null
  options: TOption[]
  placeholder?: string
  status?: 'default' | 'invalid'
  onChange?: (
    name: TCustomSelectProps['name'],
    selected: TOption['value'],
  ) => void
  onClose?: () => void
}

export type TOptionProps = {
  option: TOption
  onClick: (value: TOption['value']) => void
}
