import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'




// const reactElement={
//     type:"a",
//     props:{
//         href:"href://google.com",
//         target: "_blank"

//     },
//     Children: "lick me to visit google"
// }

const anotherElement = (
  <a href="https://google.com" target="_blank">Visit Google</a>
)

const reactElement = React.createElement(
  'a',
  { href: "https://google.com", target: "_blank" },
  'Click me to visit Google'
)


ReactDOM.createRoot(document.getElementById('root')).render(
)(
  reactElement
)
