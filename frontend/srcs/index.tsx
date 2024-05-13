import './index.css'
import React from 'react'
import App from './app/app'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from "./state/store.ts"


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)