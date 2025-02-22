import './index.css'
import React from 'react'
import App from './app/app'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from "./state/store.ts"
import {NextUIProvider} from "@nextui-org/react";
import './disableWarnings'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <NextUIProvider>
      <main className="dark text-foreground bg-background" >
      <Provider store={store}>
        <App />
      </Provider>
      </main>
    </NextUIProvider>

)