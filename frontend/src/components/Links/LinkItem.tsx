import { FC } from 'react'

import style from './style.module.css'

type Props = {
  id: string
  title: string
  url: string
  createdAt: string
}

export const LinkItem: FC<Props> = (props: Props) => {
  const { title, url, createdAt } = props
  const date = new Date(createdAt)
  const day = date.toLocaleDateString()
  const time = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })

  const handleClickLink = () => {
    window.open(url, '_blank')
  }

  return (
    <tr onClick={handleClickLink}>
      <td className={style.column1}>{`${day} @ ${time}`}</td>
      <td className={style.column2}>{title}</td>
      <td className={style.column3}>{url}</td>
    </tr>
  )
}
