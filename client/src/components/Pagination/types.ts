export interface IPagination extends React.ComponentProps<'ul'> {
  paginationSize?: 'small' | 'large'
}

// https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
// type HTMLElementEvent<T extends HTMLElement> = Event & {
//   target: T
// }
