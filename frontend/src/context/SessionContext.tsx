import { createContext, useState, useCallback, FC, ReactNode } from 'react'

import getTokenService from '../services/getToken'

type SessionContextProps = {
  children: ReactNode
}

type UserContext = {
  jwt: string
  loading: boolean
  error: string | null
  getJwt: () => void
  setJwt: (jwt: string) => void
}

const Context = createContext<UserContext>({
  jwt: '',
  loading: false,
  error: null,
  getJwt: () => {},
  setJwt: () => {}
})

export const SessionContextProvider: FC<SessionContextProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getJwt = useCallback(() => {
    const storedToken = window.sessionStorage.getItem('jwt') ?? ''
    if (storedToken !== '') {
      setJwt(storedToken)
      setLoading(false)
      return
    }

    setLoading(true)
    getTokenService()
      .then(newJwt => {
        window.sessionStorage.setItem('jwt', newJwt)
        setJwt(newJwt)
        setError(null)
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwt')
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return <Context.Provider value={{ jwt, getJwt, setJwt, loading, error }}>
    {children}
  </Context.Provider>
}

export default Context
