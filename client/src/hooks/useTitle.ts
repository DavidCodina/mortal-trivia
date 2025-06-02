import { useEffect } from 'react'

// ⚠️ This hook is not necessary for newer versions of React or Next.js.
// This hook is only useful in legacy applications.
export const useTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    return () => {
      document.title = prevTitle
    }
  }, [title])
}
