import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'

import SignInOptions from './components/AuthComponents/SignInOptions/SignInOptions'
import SignIn from './components/AuthComponents/SignIn/SignIn'
import CreateAccount from './components/AuthComponents/CreateAccount/CreateAccount'
import SetUserNameAndPicture from './components/AuthComponents/SetUserNameAndPicture/SetUserNameAndPicture'

export default function App() {
  return (
      <>
              <SetUserNameAndPicture></SetUserNameAndPicture>
              <CreateAccount/>
              <SignIn />
              <SignInOptions />
      </>


  );
}




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)