import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Theme className='bg-night border-2 border-sunset'>
      <App />
    </Theme>
  </React.StrictMode>
)

window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})