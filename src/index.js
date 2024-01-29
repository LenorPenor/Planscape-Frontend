import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

//disable devtools in prod mode
if(process.env.NODE_ENV === 'production') disableReactDevTools()

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)