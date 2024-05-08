import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'

import SignInOptions from './components/AuthComponents/SignInOptions/SignInOptions'
import SignIn from './components/AuthComponents/SignIn/SignIn'


export default function App() {
    return (
      <>
  
          <SignIn/>
          <SignInOptions></SignInOptions>

      </>


    )
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)