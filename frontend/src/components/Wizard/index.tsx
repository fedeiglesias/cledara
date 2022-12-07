import { useState, useContext } from 'react'
import { QRCodeSVG } from 'qrcode.react'

import { Link } from 'react-router-dom'

import { Button } from '../Button'

import sessionContext from '../../context/SessionContext'

import style from './styles.module.css'

type Props = {
  onFinish?: Function
}

export const Wizard = (props: Props) => {
  const [step, setStep] = useState(1)
  const { jwt } = useContext(sessionContext)

  const scannerUrl: string = `${import.meta.env.VITE_API_DOMAIN as string}/scanner`

  const handleFinishClick = () => {
    if (typeof props.onFinish !== 'function') return
    props.onFinish()
  }

  return <>
    { step === 1 &&
      <div className={style.container}>
        <h1>Open Scaner in your Cellphone</h1>
        <p>Scan this QR code with your Smarphone Camera Or go to</p>
        <Link rel="noopener noreferrer" target="_blank" to="/scanner">{scannerUrl}</Link>
        <QRCodeSVG size={256} value={scannerUrl} />
        <footer>
          <Button onClick={() => setStep(2)}>Next</Button>
        </footer>
      </div>
    }

    {
      step === 2 &&
      <div className={style.container}>
        <h1 className={style.title}>Link your scanner to this session</h1>
        <p>Give Permissions to use the camera and scan this code to link the scanner to this session</p>
        <QRCodeSVG size={256} value={jwt}/>
        <footer>
          <Button onClick={() => setStep(1)}>Back</Button>
          <Button onClick={() => setStep(3)}>Next</Button>
        </footer>
      </div>
    }

    {
      step === 3 &&
      <div className={style.container}>
        <h1 className={style.title}>Start Scanning Links!</h1>
        <p> Start scanning QR codes containing URLs, then you can click the <b>Update List</b> button to see all the results. Have a nice day!</p>
        <footer>
          <Button onClick={() => setStep(2)}>Back</Button>
          <Button onClick={handleFinishClick}>Finish</Button>
        </footer>
      </div>
    }

  </>
}
