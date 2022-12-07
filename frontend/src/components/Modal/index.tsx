import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import style from './styles.module.css'

type Props = {
  children: ReactNode
  onBackDropClick?: Function
}

export const Modal = (props: Props) => {
  const portal: Element = document.body as Element

  const handleBackdropClick = () => {
    if (typeof props.onBackDropClick !== 'function') return
    props.onBackDropClick()
  }

  return createPortal((
    <div className={style.root}>
      <div className={style.content}>
        { props.children }
      </div>
      <div className={style.backdrop} onClick={handleBackdropClick}/>
    </div>
  ), portal)
}
