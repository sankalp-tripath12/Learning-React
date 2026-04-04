import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Custom component
function MyApp() {
  return (
    <div>
      <h1>Custom App</h1>
    </div>
  )
}

// JSX element
const anotherElement = (
  <a href="https://google.com" target="_blank" rel="noopener noreferrer">
    Visit Google
  </a>
)

// React.createElement version
const reactElement = React.createElement(
  'a',
  { href: "https://google.com", target: "_blank", rel: "noopener noreferrer" },
  'Click me to visit Google'
)

// Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {reactElement}
  </StrictMode>
)