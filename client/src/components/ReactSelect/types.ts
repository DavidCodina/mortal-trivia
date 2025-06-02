// Use this to lock down selectRef when consuming.
// const selectRef = useRef<SelectInstance>(undefined)
export type { SelectInstance } from 'react-select'

// ⚠️ Why limit value to string? In practice, it can probably be anything.
export type ReactSelectOption = {
  value: string
  label: string
  [key: string]: any
}
export type ReactSelectValue = ReactSelectOption | ReactSelectOption[] | null
