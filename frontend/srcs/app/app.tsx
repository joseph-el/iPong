import React from 'react'

import './app.css'

import {NextUIProvider} from '@nextui-org/react'
import SignInOptions from '../components/AuthComponents/SignInOptions/SignInOptions'
import SignIn from '../components/AuthComponents/SignIn/SignIn'
import CreateAccount from '../components/AuthComponents/CreateAccount/CreateAccount'
import SetUserNameAndPicture from '../components/AuthComponents/SetUserNameAndPicture/SetUserNameAndPicture'
import WeSentCodeAndPassword from '../components/AuthComponents/WeSentCodeAndPassword/WeSentCodeAndPassword'

import SignAuth from '../pages/SignAuth/SignAuth'
import AppLayout from '../pages/AppLayout/AppLayout'
 import { ChakraProvider } from '@chakra-ui/react'

export default function App() {
    return (
        <>

            <ChakraProvider>
              <AppLayout/>
            </ChakraProvider>

        </>
    );
  }