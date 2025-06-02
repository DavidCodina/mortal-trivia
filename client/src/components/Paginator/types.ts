// https://stackoverflow.com/questions/68038912/only-odd-numbers-type-for-typescript
// This solution for generating a range of odd numbers is a little overkill for the
// current use case. One could just as easily type a union of: 3 | 5 | 7. That said,
// it's a cool pattern and allows for any number of odd numbers, so if you wanted
// 3 to 1001, you obviously wouldn't want to type all that out.

type OddNumber<
  X extends number,
  Y extends unknown[] = [1],
  Z extends number = never
> = Y['length'] extends X
  ? Z | Y['length']
  : OddNumber<X, [1, 1, ...Y], Z | Y['length']>

export type OddNumberUpTo7 = OddNumber<7>

export type PaginatorProps = {
  paginationClassName?: string
  paginationStyle?: React.CSSProperties

  /** Note: when active className and style variants are not defined,
   * they default to the non-active counterparts. The active variants
   * overwrite and entirely REPLACE the non-active variants, rather
   * than merging with them. */
  activePaginationItemClassName?: string
  activePaginationItemStyle?: React.CSSProperties
  activePaginationButtonClassName?: string
  activePaginationButtonStyle?: React.CSSProperties

  paginationItemClassName?: string
  paginationItemStyle?: React.CSSProperties
  paginationButtonClassName?: string
  paginationButtonStyle?: React.CSSProperties

  onClick: (
    newPage: number,
    prevPage: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  page: number

  itemsPerPage: number
  itemCount: number

  numberedItems?: OddNumberUpTo7

  showFirstLast?: boolean
  showPrevNext?: boolean
  /** This refers the size of the component, NOT the number of items being paginated. */
  paginationSize?: 'small' | 'large'
}
