import { useEffect, useRef } from 'react'

/* ======================
     useDismount()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// This implementation works by avoiding having to pass the cleanup function into
// the final useEffect's dependency array by assgining it to a ref. However,
// to avoid stale closure issues, the ref itself is actually updated on every render.
// The end result is a cleanup function that can update along with the environment
// of the consuming component.
//
// Usage:
//
//   const UseDismountDemo = () => {
//     const [count, setCount] = useState(0)
//     useDismount(() => { console.log('Cleaning up...', count) })
//
//     return (
//       <Button
//         className='mx-auto my-6 flex'
//         onClick={() => setCount((v) => v + 1)}
//       >Count: {count}</Button>
//     )
//   }
//
///////////////////////////////////////////////////////////////////////////

export const useDismount = (cleanup: () => void) => {
  const cleanupRef = useRef(cleanup)

  useEffect(() => {
    cleanupRef.current = cleanup
  })

  useEffect(() => {
    return () => cleanupRef.current?.()
  }, [])
}
