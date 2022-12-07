import { useEffect, useContext } from 'react'

import sessionContext from '../context/SessionContext'
import { Nav } from '../components/Nav'
import { LinkList } from '../components/Links/LinkList'

export const Summary = () => {
  const { getJwt } = useContext(sessionContext)

  useEffect(() => {
    getJwt()
  }, [])

  return <>
    <Nav/>
    <main>
      <LinkList />
    </main>
  </>
}
