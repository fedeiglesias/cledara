import { createContext, FC, ReactNode, useState, useEffect, useContext, useCallback } from 'react'

import { Link } from '../types/Link'

import getLinksService from '../services/getLinks'

import sessionContext from './SessionContext'

type LinksContextProps = {
  children: ReactNode
}

type LinksContext = {
  links: Link[]
  loading: boolean
  success: boolean
  reloadLinks: () => void
}

const Context = createContext<LinksContext>({
  links: [],
  loading: true,
  success: true,
  reloadLinks: () => {}
})

export const LinksContextProvider: FC<LinksContextProps> = ({ children }) => {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [success, setSuccess] = useState<boolean>(true)
  const { jwt } = useContext(sessionContext)

  const reloadLinks = useCallback(() => {
    setLoading(true)
    getLinksService(jwt)
      .then(links => links.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)))
      .then(links => setLinks(links))
      .then(() => setSuccess(true))
      .catch(e => setSuccess(false))
      .finally(() => {
        setLoading(false)
      })
  }, [jwt])

  useEffect(() => {
    if (jwt === '') return
    reloadLinks()
  }, [jwt])

  return <Context.Provider value={{ loading, success, links, reloadLinks }}>
    {children}
  </Context.Provider>
}

export default Context
