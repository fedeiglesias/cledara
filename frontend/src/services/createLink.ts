import { Link } from '../types/Link'

import { ENDPOINT } from './settings'

export default async function (jwt: string, url: string): Promise<Link> {
  return await fetch(`${ENDPOINT}/prod/link`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  }).then(async res => {
    if (!res.ok) throw new Error('Response is NOT ok')
    return await res.json()
  }).then(link => {
    return link
  })
}
