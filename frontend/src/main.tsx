import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './reset.css'
import './index.css'
import '@fontsource/plus-jakarta-sans/variable.css'

const rootEl = document.getElementById('root') as HTMLElement
const root = createRoot(rootEl)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
