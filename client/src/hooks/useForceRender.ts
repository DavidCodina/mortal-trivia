import { useReducer } from 'react'

// This works, but the useReducer() version is more idiomatic.
// export const useForceRender = (): VoidFunction => {
//   const [, setForceRenderCount] = useState(0)
//   return useCallback(() => {
//     setForceRenderCount((v) => v + 1)
//   }, [])
// }

// See also: https://github.com/CharlesStover/use-force-update/blob/main/src/index.ts
// const useForceRender = (): VoidFunction => {
//   const createNewObject = (): Record<string, never> => ({})
//   const [, setValue] = useState<Record<string, never>>(createNewObject)
//   return useCallback((): void => {
//     setValue(createNewObject())
//   }, [])
// }

// What if we want to run forceRender() in a useEffect()?
// Should we instead wrap it in a useCallback() prior to returning it?
// No. The function returned by useReducer (dispatch) is always the same instance.
// React guarantees that the dispatch function returned by useReducer
// is referentially stable. That means it won’t change between renders,
// so a useEffect dependency array [forceRender] won’t trigger an infinite loop.
export const useForceRender = (): VoidFunction => {
  const [, dispatch] = useReducer((x: number) => x + 1, 0)

  return dispatch
}
