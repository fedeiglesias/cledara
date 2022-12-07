import { FC, useState, useContext } from 'react'

import logo from '../../assets/logo.svg'
import { Button } from '../Button'
import { Modal } from '../Modal'

import { Wizard } from '../Wizard'

import linksContext from '../../context/LinksContext'

import style from './styles.module.css'

export const Nav: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const { reloadLinks } = useContext(linksContext)

  const handleAddScannerClick = () => {
    setShowModal(prevState => !prevState)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  return <nav className={style.nav}>
    <img className={style.logo} src={logo}/>
    <div className={style.actions}>
      <Button onClick={() => reloadLinks()}>Update List</Button>
      <Button onClick={handleAddScannerClick}>Add Scanner</Button>
    </div>
    { showModal &&
    <Modal onBackDropClick={handleModalClose}>
      <Wizard onFinish={() => handleModalClose()}/>
    </Modal>
    }

  </nav>
}
