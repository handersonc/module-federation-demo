import { useLocation } from 'react-router-dom'

function useQueryString() {
  const location = useLocation()

  return new URLSearchParams(location.search)
}

export default useQueryString
