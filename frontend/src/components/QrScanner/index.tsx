import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useZxing } from 'react-zxing'

import sessionContext from '../../context/SessionContext'
import createLinkService from '../../services/createLink'

import frame from '../../assets/scanner.svg'

import style from './styles.module.css'

export const QrScanner = () => {
  const portal: Element = document.body as Element
  const { jwt, setJwt } = useContext(sessionContext)
  const [scannedCode, setScannedCode] = useState<null | string>(null)
  const [scannedURLs, setScannedURLs] = useState<string[]>([])
  const [infoSuccessVisible, setInfoSuccessVisible] = useState(false)

  const { ref } = useZxing({
    onResult (result) {
      if (scannedCode === null && result !== undefined && result !== null) {
        setScannedCode(result.getText())
      }
    }
  })

  const isJWT = (jwt: string): boolean => {
    const result = String(jwt).match(/eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/g)
    return result === null ? false : Boolean(result.length)
  }

  function isURL (url: string): boolean {
    try {
      const newUrl = new URL(url)
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
    } catch (err) {
      return false
    }
  }

  const handleInfoSuccess = () => {
    setInfoSuccessVisible(true)
    setTimeout(() => setInfoSuccessVisible(false), 3000)
  }

  useEffect(() => {
    if (scannedCode === null) return

    if (jwt === '' && isJWT(scannedCode)) {
      setJwt(scannedCode)
      setScannedCode(null)
      return
    }

    if (jwt !== '' && isURL(scannedCode) && !scannedURLs.includes(scannedCode)) {
      createLinkService(jwt, scannedCode)
        .then(link => {
          setScannedURLs(prevState => [...prevState, scannedCode])
          handleInfoSuccess()
        })
        .catch(e => console.log('error'))
        .finally(() => setScannedCode(null))
    } else {
      setScannedCode(null)
    }
  }, [scannedCode])

  return createPortal(
      <div className={style.container}>

        { jwt === '' && <div className={`${style.status} ${style.warning}`}>Scan your QR Session Code to start</div>}
        { infoSuccessVisible && <div className={`${style.status} ${style.success}`}>URL scanned successfully!</div> }
        <img className={style.frame} src={frame}/>
        <div className={style.radar} />
        <video ref={ref} />
      </div>, portal)
}
