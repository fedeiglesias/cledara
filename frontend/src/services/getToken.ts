import { ENDPOINT } from './settings'

export default async function (): Promise<string> {
  return await fetch(`${ENDPOINT}/prod/token`)
    .then(async res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return await res.json()
    }).then(res => {
      const { token } = res
      return token
    })
}
