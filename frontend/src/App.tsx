import { Route, Routes } from 'react-router-dom'

import { SessionContextProvider } from './context/SessionContext'
import { LinksContextProvider } from './context/LinksContext'

import { Summary } from './pages/Summary'
import { Scanner } from './pages/Scanner'

function App () {
  return (
    <SessionContextProvider>
      <LinksContextProvider>
        <div className="App">
          <Routes>
            <Route element={ <Summary /> } path="/" />
            <Route element={ <Scanner /> } path="/scanner"/>
          </Routes>
        </div>
      </LinksContextProvider>
    </SessionContextProvider>
  )
}

export default App
