import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Ppp } from './UserContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Ppp>
       <App />
    </Ppp>   
  </React.StrictMode>,
)
