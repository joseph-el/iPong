import React from 'react'
import ReactDOM from 'react-dom/client'

import SignInOptions from './components/AuthComponents/SignInOptions/SignInOptions'
export default function App() {
    return (
      <SignInOptions></SignInOptions>
    )
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)