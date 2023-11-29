import { useEffect } from 'react'

const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        callback()
      }
    }

    const handlePopstate = () => {
      console.log("delete")
      callback()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [callback])
}

export default useEscapeKey
