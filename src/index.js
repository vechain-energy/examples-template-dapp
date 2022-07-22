import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { VeChainProvider } from '@vechain.energy/use-vechain'

const Network = {
  config: {
    node: process.env.NETWORK_NODE,
    network: process.env.NETWORK_TYPE
  },
  options: {
    delegate: process.env.NETWORK_DELEGATE,
    delegateTest: process.env.NETWORK_DELEGATE_TEST
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HashRouter>
      <VeChainProvider {...Network}>
        <App />
      </VeChainProvider>
    </HashRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
