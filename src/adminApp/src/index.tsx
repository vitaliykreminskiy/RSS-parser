import React from 'react'
import ReactDOM from 'react-dom'

import { LoginPage } from './components/pages/LoginPage'
import {
  SessionProvider,
  useSession,
} from './components/providers/SessionProvider'
import { FeedPage } from './components/pages/FeedPage'

/**
 * TODO: Check whether user logged in on first load
 */
const App = () => {
  const { isLoggedIn } = useSession()

  return isLoggedIn ? <FeedPage /> : <LoginPage />
}

ReactDOM.render(
  <SessionProvider>
    <App />
  </SessionProvider>,
  document.getElementById('root')
)
