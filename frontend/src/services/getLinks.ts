import { Link } from '../types/Link'

import { ENDPOINT } from './settings'

export default async (jwt: string): Promise<Link[]> => {
  return await fetch(`${ENDPOINT}/prod/link`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  }).then(async res => {
    if (!res.ok) throw new Error('Response is NOT ok')
    return await res.json()
  }).then(res => {
    const { links } = res
    return links
  })
}
