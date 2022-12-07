import { FC, useContext } from 'react'

import linksContext from '../../context/LinksContext'

import { LinkItem } from './LinkItem'

import style from './style.module.css'

export const LinkList: FC = () => {
  const { links, loading } = useContext(linksContext)

  return (<>

    { (!loading && links.length === 0) && <h3 className={style.info}>Please Add new scanner and use it to see results!</h3>}

    { (!loading && links.length > 0) &&
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.column1}>Date</th>
            <th className={style.column2}>Title</th>
            <th className={style.column3}>Url</th>
          </tr>
        </thead>
        <tbody>
          { links.map(link => <LinkItem key={link.id} {...link}/>)}
        </tbody>
      </table>
    }

  </>)
}
