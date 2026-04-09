# React Complete Masterclass — Beginner to Advanced

---

# CHAPTER 1 — WHAT IS REACT AND HOW IT WORKS

## What is React

React is a JavaScript library built by Facebook (Meta) that lets you build user interfaces in small, reusable pieces called components. It handles all DOM updates in the smartest possible way.

```
Traditional Website:
  User clicks → Browser updates ENTIRE page → Slow

React Website:
  User clicks → React finds ONLY what changed → Updates just that → Fast
```

## How React Works Internally

**The Virtual DOM**

The browser's real DOM is slow to update because every change can cause re-painting of the entire page. React creates a copy of the DOM in memory called the Virtual DOM — a plain JavaScript object. Reading and writing JavaScript objects is extremely fast.

```
Real DOM:    Actual browser elements  →  Slow to update
Virtual DOM: JavaScript objects       →  Fast to update
```

When something changes:

```
Step 1: React creates NEW Virtual DOM (what UI should look like now)
Step 2: React compares NEW vs OLD Virtual DOM (called DIFFING)
Step 3: React finds exactly what changed
Step 4: React updates ONLY those changed parts in the Real DOM
```

This process is called **Reconciliation**.

**React Fiber**

Before React 16, all updates were synchronous and could freeze the browser. React Fiber breaks rendering into small units and handles priority:

```
High priority (user typing, clicking)  →  Do immediately
Low priority (background data update)  →  Do when browser is free
```

**Complete Flow When State Changes:**

```
You update state
      ↓
React schedules a re-render
      ↓
React runs your component function again
      ↓
React gets new Virtual DOM description
      ↓
React diffs new vs old Virtual DOM
      ↓
React finds minimal set of changes
      ↓
React applies ONLY those changes to Real DOM
      ↓
Browser repaints only changed pixels
```

## Setting Up React

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

**Project Structure:**

```
src/
├── main.jsx      ← entry point, mounts React into index.html
├── App.jsx       ← your root component
└── index.css     ← global styles
index.html        ← the ONE html file (almost empty)
```

**main.jsx explained line by line:**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

`document.getElementById('root')` — finds the single div in index.html. Everything React builds goes inside it.

`ReactDOM.createRoot()` — creates React's entry point into the DOM.

`.render(<App />)` — tells React to render your App component.

`React.StrictMode` — development helper that catches bugs by double-invoking functions. Does nothing in production.

---

# CHAPTER 2 — JSX

## What is JSX

JSX stands for JavaScript XML. It lets you write HTML-like syntax directly inside JavaScript. It is NOT real HTML — it is syntactic sugar that gets converted to plain JavaScript before the browser sees it.

```jsx
// What you write (JSX):
const element = <h1>Hello World</h1>

// What it becomes (plain JavaScript):
const element = React.createElement('h1', null, 'Hello World')
```

JSX makes your code readable. Without it, you would have to write `React.createElement` for every single element — which becomes unreadable for complex UIs.

## How JSX Converts to JavaScript

**Babel** is the tool that converts JSX to JavaScript. It runs behind the scenes when you build your project.

```jsx
// JSX you write:
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>World</p>
  </div>
)

// What Babel converts it to:
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
)
```

`React.createElement(type, props, ...children)` takes three things — the element type, its properties, and its children.

## JSX Rules — Every Single One

**Rule 1 — Must return ONE parent element:**

```jsx
// WRONG — two siblings at top level:
return (
  <h1>Title</h1>
  <p>Paragraph</p>
)

// CORRECT — wrap in a div:
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
)

// CORRECT — use Fragment (no extra div in DOM):
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
)
```

**Rule 2 — Use className instead of class:**

```jsx
// WRONG:
<div class="container">

// CORRECT:
<div className="container">
```

Why: `class` is a reserved keyword in JavaScript. Since JSX is JavaScript, you must use `className`.

**Rule 3 — All tags must be closed:**

```jsx
// WRONG:
<img src="photo.jpg">
<input type="text">

// CORRECT:
<img src="photo.jpg" />
<input type="text" />
```

**Rule 4 — Use camelCase for HTML attributes:**

```jsx
// WRONG:
<button onclick="handleClick" tabindex="1">

// CORRECT:
<button onClick={handleClick} tabIndex={1}>
```

**Rule 5 — JavaScript expressions go inside curly braces:**

```jsx
const name = "Rahul"
const age = 25

return (
  <div>
    <h1>Hello, {name}</h1>           // variable
    <p>Age: {age + 5}</p>            // expression
    <p>Year: {new Date().getFullYear()}</p>  // function call
    <p>{2 + 2}</p>                   // math
  </div>
)
```

Curly braces `{}` are the portal between JSX and JavaScript. Anything inside them is evaluated as JavaScript.

**Rule 6 — Comments inside JSX:**

```jsx
return (
  <div>
    {/* This is a JSX comment */}
    <h1>Hello</h1>
  </div>
)
```

**Rule 7 — Inline styles use objects:**

```jsx
// WRONG:
<div style="color: red; font-size: 16px">

// CORRECT:
<div style={{ color: 'red', fontSize: '16px' }}>
```

Outer `{}` = JavaScript expression. Inner `{}` = JavaScript object. Property names are camelCase.

## JSX with Conditional Rendering (Preview)

```jsx
const isLoggedIn = true

return (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please login</h1>}
    {isLoggedIn && <button>Logout</button>}
  </div>
)
```

Ternary operator and `&&` operator work inside JSX. `if` statements do not directly work inside JSX return — only expressions work.

## Common JSX Mistakes

**Mistake 1 — Returning JSX without parentheses on multiple lines:**

```jsx
// WRONG — JavaScript inserts semicolon after return:
function App() {
  return
    <div>Hello</div>
}

// CORRECT:
function App() {
  return (
    <div>Hello</div>
  )
}
```

**Mistake 2 — Putting statements inside curly braces:**

```jsx
// WRONG — if is a statement, not an expression:
<div>{if (true) { 'hello' }}</div>

// CORRECT — ternary is an expression:
<div>{true ? 'hello' : 'bye'}</div>
```

---

# CHAPTER 3 — COMPONENTS

## What is a Component

A component is a self-contained, reusable piece of UI. Think of it like a custom HTML tag that you define yourself.

```
Real world analogy:
  LEGO blocks = Components
  Each block has a shape and purpose
  You combine blocks to build complex structures
  You can reuse the same block in multiple places
```

## Functional Components

Modern React uses functional components — plain JavaScript functions that return JSX.

```jsx
// Simplest possible component:
function Greeting() {
  return <h1>Hello, World!</h1>
}

// Arrow function style (same thing):
const Greeting = () => {
  return <h1>Hello, World!</h1>
}

// Arrow function with implicit return (for simple returns):
const Greeting = () => <h1>Hello, World!</h1>
```

**Rules for components:**

The function name MUST start with a capital letter. React uses this to distinguish between HTML tags (lowercase) and components (uppercase).

```jsx
<div>      // HTML tag — React renders this as-is
<Greeting> // Component — React calls this function and renders its output
```

## Class Components

Class components are the older style. You will see them in legacy code. Modern React prefers functional components with hooks.

```jsx
import React, { Component } from 'react'

class Greeting extends Component {
  render() {
    return <h1>Hello, World!</h1>
  }
}
```

The `render()` method is mandatory in class components. It must return JSX. You will not write class components in modern React, but understanding them helps when you encounter old codebases.

## Composing Components — Building the Tree

Components can use other components. This creates a component tree.

```jsx
// Small reusable components:
function Header() {
  return <header><h1>My App</h1></header>
}

function Footer() {
  return <footer><p>© 2025</p></footer>
}

function MainContent() {
  return (
    <main>
      <p>Welcome to my application!</p>
    </main>
  )
}

// Root component that combines them all:
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}
```

**The Component Tree:**

```
App
├── Header
├── MainContent
└── Footer
```

React renders this tree starting from App, then renders each child component recursively.

## How React Renders a Component

When React sees `<Header />`, it does this:

```
Step 1: React sees <Header /> in JSX
Step 2: React calls the Header function
Step 3: Header function returns JSX
Step 4: React converts that JSX to Virtual DOM nodes
Step 5: React adds those nodes to the parent's Virtual DOM
Step 6: Eventually, React updates the real DOM
```

## Exporting and Importing Components

```jsx
// In Header.jsx — named export:
export function Header() {
  return <header><h1>My App</h1></header>
}

// In App.jsx — named import:
import { Header } from './Header'


// In Header.jsx — default export:
export default function Header() {
  return <header><h1>My App</h1></header>
}

// In App.jsx — default import (no curly braces):
import Header from './Header'
```

One file can have only ONE default export but multiple named exports.

## Real-World Component Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   └── Card.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── App.jsx
```

---

# CHAPTER 4 — PROPS

## What are Props

Props (short for properties) are how you pass data FROM a parent component TO a child component. They flow in one direction only — parent to child. This is called unidirectional data flow.

```
Think of props like function arguments:
  A function without arguments does the same thing every time.
  A function with arguments can do different things based on input.
  
  Component without props → always shows the same UI
  Component with props   → shows different UI based on what it receives
```

## Passing and Receiving Props

```jsx
// Parent component passes props:
function App() {
  return (
    <div>
      <UserCard name="Rahul" age={25} city="Delhi" />
      <UserCard name="Priya" age={22} city="Mumbai" />
      <UserCard name="Amit" age={28} city="Bangalore" />
    </div>
  )
}

// Child component receives props as an object:
function UserCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  )
}
```

React collects all the attributes you write on a component and bundles them into a single object called `props`. The child receives this object.

**Behind the scenes:**

```jsx
// When you write:
<UserCard name="Rahul" age={25} city="Delhi" />

// React calls:
UserCard({ name: "Rahul", age: 25, city: "Delhi" })
```

## Destructuring Props — Cleaner Code

Instead of writing `props.name`, `props.age` everywhere, you can destructure:

```jsx
// Destructuring in function parameter:
function UserCard({ name, age, city }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  )
}
```

This is the modern, preferred way. Same result, cleaner code.

## Passing Different Data Types as Props

```jsx
function DataDemo({
  title,          // string
  count,          // number
  isActive,       // boolean
  items,          // array
  user,           // object
  handleClick,    // function
}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <p>First item: {items[0]}</p>
      <p>User name: {user.name}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

// Passing all these from parent:
function App() {
  const handleClick = () => alert('clicked')
  
  return (
    <DataDemo
      title="Hello"
      count={42}
      isActive={true}
      items={['apple', 'banana', 'mango']}
      user={{ name: 'Rahul', age: 25 }}
      handleClick={handleClick}
    />
  )
}
```

Strings go in quotes. Everything else (numbers, booleans, arrays, objects, functions) go in curly braces.

## Default Props

What if the parent forgets to pass a prop? You can set defaults:

```jsx
function Button({ text = 'Click me', color = 'blue', size = 'medium' }) {
  return (
    <button style={{ backgroundColor: color }} className={size}>
      {text}
    </button>
  )
}

// Works with no props — uses all defaults:
<Button />

// Works with some props — uses defaults for the rest:
<Button text="Submit" />

// Works with all props — uses none of the defaults:
<Button text="Delete" color="red" size="large" />
```

## The children Prop — Special Prop

`children` is a special built-in prop. It contains whatever you put BETWEEN the opening and closing tags of a component.

```jsx
// Card component that wraps content:
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}          {/* whatever is put between <Card> tags */}
      </div>
    </div>
  )
}

// Using Card with children:
function App() {
  return (
    <Card title="User Info">
      <p>Name: Rahul</p>
      <p>Age: 25</p>
      <button>Edit Profile</button>
    </Card>
  )
}
```

Everything between `<Card>` and `</Card>` becomes `props.children`. This pattern is used for wrapper components — modals, cards, layouts, containers.

## Props are Read-Only — Critical Rule

You CANNOT and MUST NOT modify props inside a component. Props flow down and are owned by the parent.

```jsx
function Child({ count }) {
  // WRONG — never modify props:
  count = count + 1        // mutation! This will cause bugs
  props.count = 5          // also wrong

  // CORRECT — read props, never write them:
  const doubled = count * 2   // create new value instead
  
  return <p>{doubled}</p>
}
```

If you need to change something, that something should be state (next chapter).

## Prop Drilling — Know This Problem

When you need to pass data through multiple layers of components just to get it to a deeply nested child:

```
App (has user data)
  └── Dashboard
        └── Sidebar
              └── UserProfile (needs user data)
```

```jsx
// You end up passing props through components that don't even use them:
function App() {
  const user = { name: 'Rahul', age: 25 }
  return <Dashboard user={user} />
}

function Dashboard({ user }) {
  // Dashboard doesn't use user, just passes it down:
  return <Sidebar user={user} />
}

function Sidebar({ user }) {
  // Sidebar doesn't use user either, just passes it down:
  return <UserProfile user={user} />
}

function UserProfile({ user }) {
  // Finally used here:
  return <p>{user.name}</p>
}
```

This is prop drilling. It becomes painful when there are many levels. The solution is Context API — covered in the advanced section.

---

# CHAPTER 5 — STATE

## What is State

State is data that lives inside a component and can change over time. When state changes, React re-renders the component with the new data.

```
Props  = data that comes FROM outside (parent gives it, you cannot change it)
State  = data that lives INSIDE the component (you own it, you can change it)
```

Think of a light bulb:

```
Props: the wattage (decided externally, fixed)
State: whether it is on or off (changes based on interaction)
```

## useState Hook

`useState` is a function (hook) that lets you add state to a functional component.

```jsx
import { useState } from 'react'

function Counter() {
  // Declare state variable:
  const [count, setCount] = useState(0)
  //     ↑           ↑              ↑
  //   current    function to     initial
  //   value      update it       value

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
```

`useState(0)` returns an array of exactly two things — the current value and the setter function. You destructure them with `const [count, setCount]`.

**How re-rendering works with state:**

```
Step 1: Component renders for the first time — count is 0
Step 2: User clicks Increment
Step 3: setCount(0 + 1) is called
Step 4: React schedules a re-render
Step 5: React calls the Counter function again
Step 6: This time, useState(0) returns 1 (React remembers the new value)
Step 7: JSX renders with count = 1
Step 8: React updates the DOM
```

React persists state between re-renders. That is what makes useState special — even though the function runs again, it remembers the previous state.

## State with Different Data Types

```jsx
// Number:
const [count, setCount] = useState(0)

// String:
const [name, setName] = useState('')

// Boolean:
const [isVisible, setIsVisible] = useState(false)

// Array:
const [items, setItems] = useState([])

// Object:
const [user, setUser] = useState({ name: '', age: 0 })

// Null (loading state pattern):
const [data, setData] = useState(null)
```

## Updating Objects in State — Critical Pattern

When state is an object, you must spread the old object and then override just the field you want to change. Never mutate state directly.

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    age: '',
    city: ''
  })

  const updateName = (newName) => {
    // WRONG — direct mutation, React won't detect this:
    user.name = newName          // never do this
    setUser(user)                // React sees same reference, won't re-render

    // CORRECT — create new object with spread:
    setUser({ ...user, name: newName })
    // ...user copies all existing fields, then name: newName overrides just name
  }

  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <input 
        value={user.age}
        onChange={(e) => setUser({ ...user, age: e.target.value })}
        placeholder="Age"
      />
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  )
}
```

## Updating Arrays in State — Critical Pattern

Never push, pop, splice, or sort state arrays directly. Always create a new array.

```jsx
function TodoList() {
  const [todos, setTodos] = useState(['Buy milk', 'Go to gym'])
  const [input, setInput] = useState('')

  // ADD item — spread old array, add new item:
  const addTodo = () => {
    setTodos([...todos, input])
    setInput('')
  }

  // REMOVE item — filter creates a new array:
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  // UPDATE item — map creates a new array:
  const updateTodo = (index, newText) => {
    setTodos(todos.map((todo, i) => i === index ? newText : todo))
  }

  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add</button>
      
      {todos.map((todo, index) => (
        <div key={index}>
          <span>{todo}</span>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

## Functional State Updates — When Previous State Matters

When your new state depends on the previous state, use the functional form of the setter:

```jsx
// WRONG — might use stale state value:
setCount(count + 1)

// CORRECT — always uses the most recent state:
setCount(prevCount => prevCount + 1)
```

This matters when you call setState multiple times in one event handler:

```jsx
// This only increments once, not three times:
const incrementThrice = () => {
  setCount(count + 1)   // count is 0, sets to 1
  setCount(count + 1)   // count is still 0! sets to 1 again
  setCount(count + 1)   // count is still 0! sets to 1 again
}

// This correctly increments three times:
const incrementThrice = () => {
  setCount(prev => prev + 1)   // 0 → 1
  setCount(prev => prev + 1)   // 1 → 2
  setCount(prev => prev + 1)   // 2 → 3
}
```

## Multiple State Variables

```jsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // API call here
    } catch (err) {
      setError('Login failed. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

---

# CHAPTER 6 — EVENT HANDLING

## How Events Work in React

React uses synthetic events — a wrapper around the browser's native events that works consistently across all browsers.

```jsx
// HTML style (wrong in React):
<button onclick="handleClick()">Click</button>

// React style:
<button onClick={handleClick}>Click</button>
```

Notice: `onClick` not `onclick`. All event names in React are camelCase.

## Common Event Types

```jsx
function EventDemo() {
  return (
    <div>
      {/* Mouse events */}
      <button onClick={() => console.log('clicked')}>Click</button>
      <button onDoubleClick={() => console.log('double clicked')}>Double Click</button>
      <div onMouseEnter={() => console.log('mouse entered')}>Hover me</div>
      <div onMouseLeave={() => console.log('mouse left')}>Hover me</div>

      {/* Keyboard events */}
      <input onKeyDown={(e) => console.log('key down:', e.key)} />
      <input onKeyUp={(e) => console.log('key up:', e.key)} />
      <input onKeyPress={(e) => console.log('key press:', e.key)} />

      {/* Form events */}
      <input onChange={(e) => console.log('changed:', e.target.value)} />
      <input onFocus={() => console.log('focused')} />
      <input onBlur={() => console.log('blurred')} />
      <form onSubmit={(e) => { e.preventDefault(); console.log('submitted') }}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

## The Event Object

Every event handler receives an event object automatically:

```jsx
function InputDemo() {
  const handleChange = (event) => {
    console.log(event.target.value)     // current input value
    console.log(event.target.name)      // input's name attribute
    console.log(event.target.type)      // 'text', 'checkbox', etc.
    console.log(event.target.checked)   // for checkboxes
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter pressed!')
    }
    if (event.key === 'Escape') {
      console.log('Escape pressed!')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()    // stops browser from refreshing the page
    console.log('form submitted')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Passing Arguments to Event Handlers

```jsx
function ItemList() {
  const items = ['Apple', 'Banana', 'Mango']

  // WRONG — this calls the function immediately during render:
  // <button onClick={handleDelete(item)}>
  
  // CORRECT — wrap in arrow function to delay the call:
  const handleDelete = (itemName) => {
    console.log('Deleting:', itemName)
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          {item}
          <button onClick={() => handleDelete(item)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```

## Event Propagation — Bubbling and Stopping It

Events bubble up from child to parent. A click on a button also fires the click handler of its parent div.

```jsx
function BubblingDemo() {
  return (
    <div onClick={() => console.log('div clicked')}>
      <button onClick={(e) => {
        e.stopPropagation()    // stops event from reaching the div
        console.log('button clicked')
      }}>
        Click me
      </button>
    </div>
  )
}

// Without stopPropagation: both "button clicked" and "div clicked" log
// With stopPropagation: only "button clicked" logs
```

---

# CHAPTER 7 — CONDITIONAL RENDERING

## Rendering Different UI Based on State or Props

Conditional rendering means showing different JSX based on conditions. React evaluates these inside the return statement.

## Method 1 — Ternary Operator (Most Common)

```jsx
function AuthStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn 
        ? <h1>Welcome back, user!</h1> 
        : <h1>Please login to continue</h1>
      }
      
      {isLoggedIn 
        ? <button>Logout</button> 
        : <button>Login</button>
      }
    </div>
  )
}
```

## Method 2 — AND Operator (Show or Show Nothing)

```jsx
function Notification({ hasError, errorMessage, isLoading }) {
  return (
    <div>
      {/* Only shows if hasError is true: */}
      {hasError && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      {/* Only shows if isLoading is true: */}
      {isLoading && <div className="spinner">Loading...</div>}
      
      {/* TRAP — avoid falsy numbers with && operator: */}
      {/* This renders "0" if items.length is 0: */}
      {/* {items.length && <List items={items} />} */}
      
      {/* SAFE version: */}
      {/* {items.length > 0 && <List items={items} />} */}
    </div>
  )
}
```

## Method 3 — if/else Before Return (Full Conditions)

```jsx
function UserDashboard({ user, isLoading, error }) {
  // Handle loading:
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Handle error:
  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Handle no user:
  if (!user) {
    return <div>No user found.</div>
  }

  // Main render:
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
```

This pattern — returning early for loading/error states — is called the "early return pattern". It keeps the main render clean.

## Method 4 — Switch for Multiple Conditions

```jsx
function StatusBadge({ status }) {
  const getBadge = () => {
    switch (status) {
      case 'active':
        return <span style={{ color: 'green' }}>Active</span>
      case 'inactive':
        return <span style={{ color: 'gray' }}>Inactive</span>
      case 'banned':
        return <span style={{ color: 'red' }}>Banned</span>
      default:
        return <span>Unknown</span>
    }
  }

  return <div>Status: {getBadge()}</div>
}
```

---

# CHAPTER 8 — LISTS AND KEYS

## Rendering Lists with map()

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Mango', 'Orange', 'Grape']

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

`map()` transforms each item in the array into a JSX element. React renders all of them.

## Why Keys are Critical

Keys help React identify which items changed, were added, or were removed. Without keys, React has to re-render entire lists on every change — slow and buggy.

```jsx
// BAD — using index as key (causes bugs when list reorders):
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// GOOD — using unique, stable ID from data:
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
```

**Why index as key is bad:**

```
Initial list:    Key 0: Apple   Key 1: Banana   Key 2: Mango
Delete Apple:    Key 0: Banana  Key 1: Mango

React thinks Key 0 changed from Apple to Banana, Key 1 from Banana to Mango.
It updates two items instead of removing one.
This causes wrong animations, wrong focus, wrong form inputs.

With proper IDs:
Initial:         Key: a1: Apple  Key: b2: Banana  Key: m3: Mango
Delete Apple:    Key: b2: Banana  Key: m3: Mango

React correctly identifies only Key a1 was removed.
```

## Rendering Lists of Objects

```jsx
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', price: 50000, inStock: true },
    { id: 2, name: 'Phone', price: 20000, inStock: false },
    { id: 3, name: 'Tablet', price: 30000, inStock: true },
  ]

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          {product.inStock 
            ? <span style={{ color: 'green' }}>In Stock</span>
            : <span style={{ color: 'red' }}>Out of Stock</span>
          }
        </div>
      ))}
    </div>
  )
}
```

## Filtering Lists Before Rendering

```jsx
function FilterableList() {
  const [filter, setFilter] = useState('all')
  
  const products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Phone', category: 'electronics' },
    { id: 3, name: 'Shirt', category: 'clothing' },
    { id: 4, name: 'Jeans', category: 'clothing' },
  ]

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter)

  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('electronics')}>Electronics</button>
      <button onClick={() => setFilter('clothing')}>Clothing</button>

      {filteredProducts.map(product => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  )
}
```

---

# CHAPTER 9 — useEffect

## What is useEffect

`useEffect` lets you perform side effects in functional components. Side effects are things that happen outside the normal render cycle — fetching data, setting up subscriptions, directly manipulating the DOM, setting timers.

```
Pure rendering:    Input (props/state) → Output (JSX) → No side effects
Side effects:      Fetching data, timers, logging, DOM manipulation
```

## The Three Forms of useEffect

**Form 1 — No dependency array (runs after EVERY render):**

```jsx
useEffect(() => {
  console.log('This runs after every render')
})
```

**Form 2 — Empty dependency array (runs only ONCE after first render):**

```jsx
useEffect(() => {
  console.log('This runs only once, like componentDidMount')
}, [])
```

**Form 3 — With dependencies (runs when specified values change):**

```jsx
useEffect(() => {
  console.log('This runs when count or name changes')
}, [count, name])
```

## Fetching Data with useEffect

The most common use case:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reset states when userId changes:
    setLoading(true)
    setError(null)

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch')
        return response.json()
      })
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [userId])   // Re-runs whenever userId changes

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## Cleanup Function — Very Important

Some effects need cleanup when the component unmounts or before the effect runs again. You return a function from useEffect for cleanup.

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Set up the interval:
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup function — runs when component unmounts
    // or before next effect runs:
    return () => {
      clearInterval(intervalId)    // stop the timer
      console.log('Timer cleaned up')
    }
  }, [])   // Empty array — set up once, clean up once

  return <p>Seconds: {seconds}</p>
}
```

**Without cleanup:** If the user navigates away and the component unmounts, the interval keeps running in the background, trying to update state that no longer exists. This causes memory leaks and React warnings.

## Event Listeners with useEffect

```jsx
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Add listener:
    window.addEventListener('resize', handleResize)

    // Clean up — remove listener when component unmounts:
    return () => window.removeEventListener('resize', handleResize)
  }, [])   // Empty array — add once, remove once

  return (
    <p>Window: {size.width} x {size.height}</p>
  )
}
```

## The Async/Await Pattern with useEffect

You cannot make the useEffect callback itself async. Instead, define an async function inside and call it:

```jsx
useEffect(() => {
  // WRONG — cannot do this:
  // async () => { await fetch(...) }

  // CORRECT — define async function inside, then call it:
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    }
  }

  fetchData()
}, [])
```

## useEffect Common Mistakes

**Mistake 1 — Missing dependencies:**

```jsx
// BUG — count is used but not in dependency array:
useEffect(() => {
  document.title = `Count is ${count}`
}, [])   // Wrong! Should be [count]

// CORRECT:
useEffect(() => {
  document.title = `Count is ${count}`
}, [count])
```

**Mistake 2 — Infinite loop:**

```jsx
// INFINITE LOOP — state update triggers re-render,
// which triggers effect, which updates state, which triggers re-render...
useEffect(() => {
  setCount(count + 1)   // state update inside effect
})                      // with no dependency array!

// Fix: add proper dependencies or restructure logic
```

**Mistake 3 — Stale closure:**

```jsx
// BUG — count inside effect is always the initial value (0):
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count)    // always logs 0 due to stale closure
  }, 1000)
  return () => clearInterval(interval)
}, [])   // Missing count in dependencies

// CORRECT:
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1)   // use functional update to avoid stale value
  }, 1000)
  return () => clearInterval(interval)
}, [])
```

---

# CHAPTER 10 — FORMS

## Controlled Components — React Owns the Input

In a controlled component, React state is the single source of truth for input values. Every keypress updates state, and state drives what the input displays.

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    agreeToTerms: false,
    country: 'india',
  })

  // Generic handler for all text inputs:
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
      // computed property name [name] uses the input's name attribute as the key
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()    // prevent browser refresh
    console.log('Form data:', formData)
    // Send to API here
  }

  return (
    <form onSubmit={handleSubmit}>
      
      {/* Text input */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      {/* Email input */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password input */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Radio buttons */}
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>

      {/* Checkbox */}
      <div>
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          I agree to terms and conditions
        </label>
      </div>

      {/* Select dropdown */}
      <div>
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
      </div>

      <button type="submit">Register</button>
    </form>
  )
}
```

## Form Validation

```jsx
function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return   // stop here, don't submit
    }

    setErrors({})
    console.log('Valid! Submitting:', form)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field as user types:
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  )
}
```

## Uncontrolled Components — useRef

In an uncontrolled component, the DOM manages its own state. React reads the value only when needed using a ref.

```jsx
import { useRef } from 'react'

function UncontrolledForm() {
  const nameRef = useRef()
  const emailRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Read values only on submit:
    console.log('Name:', nameRef.current.value)
    console.log('Email:', emailRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

Use controlled components for most cases. Use uncontrolled for file inputs or when integrating with non-React code.

---

# CHAPTER 11 — LIFTING STATE UP AND COMPONENT COMMUNICATION

## The Problem — Sibling Communication

Two sibling components cannot directly share data. Component A cannot directly read or write Component B's state.

```
       App
      /   \
   CompA   CompB
```

CompA has data that CompB needs. Props only go downward. How do you share?

## The Solution — Lift State to Common Ancestor

Move the state up to the closest common ancestor. Let the ancestor manage the state and pass it down to both children.

```jsx
// WRONG approach — state trapped in one component:
function ComponentA() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
}

function ComponentB() {
  // Cannot access count from ComponentA!
}

// CORRECT — lift state to parent:
function App() {
  const [count, setCount] = useState(0)   // State lives here

  return (
    <div>
      <ComponentA count={count} onIncrement={() => setCount(c => c + 1)} />
      <ComponentB count={count} />         {/* Both receive it as props */}
    </div>
  )
}

function ComponentA({ count, onIncrement }) {
  return <button onClick={onIncrement}>Increment: {count}</button>
}

function ComponentB({ count }) {
  return <p>Current count is: {count}</p>
}
```

## Real Example — Temperature Converter

```jsx
function TemperatureConverter() {
  const [celsius, setCelsius] = useState('')

  const fahrenheit = celsius !== '' 
    ? (celsius * 9/5) + 32 
    : ''

  return (
    <div>
      <h2>Temperature Converter</h2>
      <CelsiusInput 
        value={celsius} 
        onChange={setCelsius} 
      />
      <FahrenheitDisplay value={fahrenheit} />
    </div>
  )
}

function CelsiusInput({ value, onChange }) {
  return (
    <div>
      <label>Celsius: </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function FahrenheitDisplay({ value }) {
  return <p>Fahrenheit: {value}</p>
}
```

## Passing Functions as Props — Child to Parent Communication

The child cannot modify the parent's state directly. But the parent can pass a function down, and the child calls it.

```jsx
// Pattern: Parent owns state, passes handler to child
function Parent() {
  const [message, setMessage] = useState('')

  const handleMessageFromChild = (msg) => {
    setMessage(msg)
  }

  return (
    <div>
      <p>Message received: {message}</p>
      <Child onSendMessage={handleMessageFromChild} />
    </div>
  )
}

function Child({ onSendMessage }) {
  return (
    <button onClick={() => onSendMessage('Hello from child!')}>
      Send message to parent
    </button>
  )
}
```

---

# CHAPTER 12 — REACT ROUTER

## What is React Router

React Router is a library that enables navigation between different "pages" (components) in a React SPA without full page reloads.

```bash
npm install react-router-dom
```

## Basic Setup

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home()    { return <h1>Home Page</h1> }
function About()   { return <h1>About Page</h1> }
function Contact() { return <h1>Contact Page</h1> }
function NotFound(){ return <h1>404 — Page Not Found</h1> }
```

`BrowserRouter` — wraps your app, enables routing. `Routes` — container for all Route definitions. `Route` — maps a URL path to a component. `Link` — renders an anchor tag that navigates without page reload. `NavLink` — same as Link but adds an active class when the route matches. `path="*"` — catches all unmatched routes (404 page).

## Dynamic Routes — URL Parameters

```jsx
import { useParams } from 'react-router-dom'

// Route definition:
<Route path="/user/:id" element={<UserProfile />} />
<Route path="/product/:category/:id" element={<Product />} />

// UserProfile component reads URL parameter:
function UserProfile() {
  const { id } = useParams()   // extracts :id from the URL

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(r => r.json())
      .then(setUser)
  }, [id])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## Programmatic Navigation — useNavigate

```jsx
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Simulate API call:
      await loginUser(credentials)
      navigate('/dashboard')           // redirect to dashboard on success
    } catch (error) {
      console.error('Login failed')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input 
        placeholder="Email" 
        onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))}
      />
      <input 
        type="password"
        placeholder="Password"
        onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
      />
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate(-1)}>Go Back</button>
    </form>
  )
}
```

## Query Parameters and Search

```jsx
import { useSearchParams } from 'react-router-dom'

// URL: /products?category=electronics&sort=price
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'name'

  const updateCategory = (newCategory) => {
    setSearchParams({ category: newCategory, sort })
  }

  return (
    <div>
      <button onClick={() => updateCategory('electronics')}>Electronics</button>
      <button onClick={() => updateCategory('clothing')}>Clothing</button>
      <p>Showing: {category} sorted by {sort}</p>
    </div>
  )
}
```

## Nested Routes and Layouts

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>          {/* parent layout */}
          <Route index element={<Home />} />             {/* / */}
          <Route path="about" element={<About />} />    {/* /about */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />    {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  )
}
```

## Protected Routes

```jsx
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token')
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage in App:
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

# CHAPTER 13 — useRef

## What is useRef

`useRef` returns a mutable object with a `.current` property. Unlike state, changing `.current` does NOT trigger a re-render. This makes it perfect for two use cases: accessing DOM elements directly, and storing values that should persist across renders without triggering re-renders.

## Use Case 1 — Accessing DOM Elements

```jsx
import { useRef, useEffect } from 'react'

function AutoFocusInput() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()   // programmatically focus the input on mount
  }, [])

  return <input ref={inputRef} placeholder="I auto-focus on load" />
}
```

```jsx
function VideoPlayer() {
  const videoRef = useRef(null)

  const play  = () => videoRef.current.play()
  const pause = () => videoRef.current.pause()

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  )
}
```

## Use Case 2 — Storing Previous Values

```jsx
function PreviousValue() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef(0)

  useEffect(() => {
    prevCountRef.current = count   // store current count AFTER render
  })

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
```

## Use Case 3 — Storing Mutable Values That Should Not Trigger Re-render

```jsx
function StopwatchWithRef() {
  const [displayTime, setDisplayTime] = useState(0)
  const intervalRef = useRef(null)   // stores interval ID without re-rendering
  const startTimeRef = useRef(null)

  const start = () => {
    startTimeRef.current = Date.now() - displayTime * 1000
    intervalRef.current = setInterval(() => {
      setDisplayTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setDisplayTime(0)
  }

  return (
    <div>
      <p>{displayTime}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

## Ref vs State — When to Use Which

```
Use STATE when:       The UI should update when the value changes
Use REF when:         You need to store something without triggering re-render
                      You need direct access to a DOM element
                      You need to store interval/timeout IDs
```

---

# CHAPTER 14 — useMemo AND useCallback

## The Performance Problem

Every time a component re-renders, ALL the code inside the function runs again. This includes expensive calculations and function definitions.

```jsx
function ExpensiveComponent({ numbers, onItemClick }) {
  // This runs on EVERY render — even if numbers didn't change:
  const total = numbers.reduce((sum, n) => sum + n, 0)   // might be slow

  // This creates a NEW function object on EVERY render:
  const handleClick = (item) => {
    console.log('clicked:', item)
    onItemClick(item)
  }

  return <div>{total}</div>
}
```

## useMemo — Memoize Expensive Calculations

`useMemo` caches the result of a calculation. It only recalculates when its dependencies change.

```jsx
import { useMemo } from 'react'

function ProductDashboard({ products, searchTerm }) {
  // BEFORE — recalculates on every render:
  // const filteredProducts = products.filter(p => 
  //   p.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  // AFTER — only recalculates when products or searchTerm changes:
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...')   // only logs when deps change
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const totalValue = useMemo(() => {
    return filteredProducts.reduce((sum, p) => sum + p.price, 0)
  }, [filteredProducts])

  return (
    <div>
      <p>Total Value: ₹{totalValue}</p>
      {filteredProducts.map(p => (
        <p key={p.id}>{p.name} — ₹{p.price}</p>
      ))}
    </div>
  )
}
```

## useCallback — Memoize Functions

`useCallback` caches a function definition. It only creates a new function when its dependencies change. This matters when passing functions to child components that are wrapped in React.memo.

```jsx
import { useCallback } from 'react'

function Parent() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  // BEFORE — new function created on every render:
  // const handleItemClick = (item) => console.log(item)

  // AFTER — same function reference unless count changes:
  const handleItemClick = useCallback((item) => {
    console.log('clicked:', item, 'count is:', count)
  }, [count])

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <button onClick={() => setOther(o => o + 1)}>Other: {other}</button>
      
      {/* Child will not re-render when 'other' changes: */}
      <ExpensiveList onItemClick={handleItemClick} />
    </div>
  )
}
```

## React.memo — Prevent Child Re-renders

`React.memo` wraps a component and tells React: "Only re-render this component if its props actually changed."

```jsx
import { memo } from 'react'

const ExpensiveList = memo(function ExpensiveList({ items, onItemClick }) {
  console.log('ExpensiveList rendered')   // only when props actually change
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
})
```

Without `React.memo`, ExpensiveList re-renders every time the parent re-renders, even if `items` and `onItemClick` haven't changed.

## When to Actually Use These

```
DO use useMemo/useCallback when:
  ✓ Calculation is genuinely expensive (filtering thousands of items, complex math)
  ✓ You are passing functions to memoized child components
  ✓ You have a dependency in useEffect that you want stable

DO NOT use them for:
  ✗ Simple calculations (adding two numbers)
  ✗ Primitive values (memoizing a string or number)
  ✗ Everything by default — premature optimization adds complexity
```

---

# CHAPTER 15 — CUSTOM HOOKS

## What is a Custom Hook

A custom hook is a function that starts with "use" and can call other hooks inside it. Custom hooks let you extract and reuse stateful logic across multiple components.

```
Before custom hooks:  Copy-paste the same useState + useEffect logic everywhere
After custom hooks:   Write the logic once, use it anywhere
```

## Building Your First Custom Hook — useFetch

```jsx
// Custom hook — reusable data fetching logic:
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}

// Using the hook — clean and simple:
function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}

// Reuse the SAME hook in another component:
function PostList() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {posts.slice(0, 10).map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}
```

## useLocalStorage — Persist State to Browser Storage

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Usage — works exactly like useState but persists to localStorage:
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')

  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Theme: {theme}
      </button>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  )
}
```

## useDebounce — Delay State Updates

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)   // clear if value changes before delay
  }, [value, delay])

  return debouncedValue
}

// Usage — search that only fires API call after user stops typing:
function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  
  const { data: results } = useFetch(
    debouncedSearch 
      ? `https://api.example.com/search?q=${debouncedSearch}` 
      : null
  )

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {results?.map(r => <p key={r.id}>{r.title}</p>)}
    </div>
  )
}
```

## useToggle — Clean Boolean State

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}

// Usage:
function Modal() {
  const [isOpen, toggleModal] = useToggle(false)

  return (
    <div>
      <button onClick={toggleModal}>
        {isOpen ? 'Close' : 'Open'} Modal
      </button>
      {isOpen && (
        <div className="modal">
          <p>Modal content here</p>
          <button onClick={toggleModal}>Close</button>
        </div>
      )}
    </div>
  )
}
```

---

# CHAPTER 16 — CONTEXT API

## The Problem Context Solves

Prop drilling — passing props through many levels just to reach a deeply nested component — becomes unmaintainable in large apps. Context provides a way to share data globally without threading props through every level.

```
Without Context (prop drilling):
  App (has theme) → Layout → Sidebar → NavItem → Icon (needs theme)
  Every layer must pass theme down even if it doesn't use it

With Context:
  App (provides theme) → anyone can consume it directly
```

## Creating and Using Context

```jsx
import { createContext, useContext, useState } from 'react'

// Step 1 — Create the context:
const ThemeContext = createContext()

// Step 2 — Create a Provider component:
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = { theme, toggleTheme }   // what all consumers receive

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 3 — Create a custom hook for consuming:
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Step 4 — Wrap your app with the Provider:
function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

// Step 5 — Consume anywhere without prop drilling:
function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  )
}

function DeepNestedComponent() {
  const { theme } = useTheme()
  return <p style={{ color: theme === 'light' ? '#000' : '#fff' }}>Deep component</p>
}
```

## Real App — Auth Context

```jsx
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on app load:
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // In real app: call API here
    const userData = { id: 1, name: 'Rahul', email }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (loading) return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

// Using auth anywhere:
function Navbar() {
  const { user, logout, isLoggedIn } = useAuth()

  return (
    <nav>
      {isLoggedIn 
        ? <><span>Hello, {user.name}</span><button onClick={logout}>Logout</button></>
        : <Link to="/login">Login</Link>
      }
    </nav>
  )
}
```

## Multiple Contexts

You can have multiple contexts in one app:

```jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <Layout />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
```

## Context Performance Warning

When context value changes, ALL consumers re-render. Split contexts by how frequently they update:

```jsx
// BAD — one big context causes everything to re-render on any change:
<AppContext.Provider value={{ user, theme, cart, notifications }}>

// GOOD — separate contexts by change frequency:
<AuthContext.Provider value={{ user }}>         {/* rarely changes */}
  <ThemeContext.Provider value={{ theme }}>    {/* sometimes changes */}
    <CartContext.Provider value={{ cart }}>    {/* frequently changes */}
```

---

# CHAPTER 17 — ADVANCED PATTERNS

## Error Boundaries

Error boundaries catch JavaScript errors in the component tree and show a fallback UI instead of crashing the whole app. They must be class components (no hook equivalent yet).

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error logging service like Sentry
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Usage — wrap any component that might crash:
function App() {
  return (
    <ErrorBoundary fallback={<h2>Failed to load user data</h2>}>
      <UserProfile />
    </ErrorBoundary>
  )
}
```

## Code Splitting and Lazy Loading

Instead of loading your entire app upfront, load components only when they are needed.

```jsx
import { lazy, Suspense } from 'react'

// Instead of: import Dashboard from './Dashboard'
const Dashboard = lazy(() => import('./Dashboard'))
const Settings  = lazy(() => import('./Settings'))
const Reports   = lazy(() => import('./Reports'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings"  element={<Settings />} />
          <Route path="/reports"   element={<Reports />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

`lazy()` — tells React to load this component dynamically only when it is first rendered. `Suspense` — required wrapper that shows a fallback while the lazy component loads.

The browser downloads the Dashboard JS only when the user navigates to `/dashboard`, not on initial load. This dramatically reduces the initial bundle size.

---

# CHAPTER 18 — STATE MANAGEMENT WITH REDUX TOOLKIT

## When to Use Redux

```
Local state (useState):
  ✓ UI state (is this dropdown open?)
  ✓ Form data
  ✓ Component-specific data

Context API:
  ✓ Theme
  ✓ Auth user
  ✓ Simple global state

Redux:
  ✓ Complex state with many interactions
  ✓ Large teams needing predictable state
  ✓ State that needs time-travel debugging
  ✓ Many components reading and writing same data
```

## Redux Toolkit Setup

```bash
npm install @reduxjs/toolkit react-redux
```

## Creating a Slice

A slice is a piece of your global state along with the reducers that manage it.

```jsx
// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    history: []
  },
  reducers: {
    increment: (state) => {
      state.history.push(state.value)
      state.value += 1
    },
    decrement: (state) => {
      state.history.push(state.value)
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.history.push(state.value)
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0
      state.history = []
    }
  }
})

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions
export default counterSlice.reducer
```

In Redux Toolkit, you can write "mutating" code inside reducers — Immer library handles creating a new state object safely behind the scenes.

## Creating the Store

```jsx
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  }
})
```

## Providing the Store

```jsx
// src/main.jsx
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

## Connecting Components

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from './store/counterSlice'

function Counter() {
  // useSelector — reads from the store:
  const count = useSelector(state => state.counter.value)
  const history = useSelector(state => state.counter.history)
  
  // useDispatch — sends actions to the store:
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      
      <h3>History: {history.join(' → ')}</h3>
    </div>
  )
}
```

## Async Operations with createAsyncThunk

```jsx
// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk — handles the API call:
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default userSlice.reducer

// Component using the async thunk:
function UserList() {
  const { list, loading, error } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {list.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

---

# CHAPTER 19 — API HANDLING AND AUTHENTICATION

## Complete API Layer

```jsx
// src/services/api.js
const BASE_URL = 'https://api.example.com'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
})

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
  
  return data
}

export const api = {
  get: (endpoint) => 
    fetch(`${BASE_URL}${endpoint}`, { headers: getHeaders() })
      .then(handleResponse),

  post: (endpoint, body) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    }).then(handleResponse),

  put: (endpoint, body) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    }).then(handleResponse),

  delete: (endpoint) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),
}
```

## Authentication Flow

```jsx
// src/services/authService.js
export const authService = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    return data.user
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    // Decode JWT or fetch from API
    return api.get('/auth/me')
  },

  register: (userData) => api.post('/auth/register', userData),
}

// Complete auth context using the service:
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = async (email, password) => {
    const userData = await authService.login(email, password)
    setUser(userData)
    navigate('/dashboard')
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  if (loading) return <FullScreenSpinner />

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
```

---

# CHAPTER 20 — INDUSTRY-LEVEL FOLDER STRUCTURE

## The Standard Structure for Large Apps

```
src/
├── assets/                    # images, fonts, icons
│   ├── images/
│   └── icons/
│
├── components/                # reusable UI components
│   ├── common/                # used everywhere
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── index.js
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   └── Input/
│   └── layout/                # layout components
│       ├── Header/
│       ├── Footer/
│       └── Sidebar/
│
├── pages/                     # route-level components
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── index.js
│   ├── Dashboard/
│   ├── Login/
│   └── Profile/
│
├── hooks/                     # custom hooks
│   ├── useFetch.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── useAuth.js
│
├── context/                   # context providers
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── CartContext.jsx
│
├── store/                     # Redux store (if using Redux)
│   ├── store.js
│   ├── slices/
│   │   ├── userSlice.js
│   │   ├── cartSlice.js
│   │   └── productSlice.js
│   └── selectors/
│
├── services/                  # API calls, external services
│   ├── api.js                 # base API setup
│   ├── authService.js
│   ├── productService.js
│   └── userService.js
│
├── utils/                     # helper functions
│   ├── formatDate.js
│   ├── formatCurrency.js
│   ├── validators.js
│   └── constants.js
│
├── routes/                    # routing configuration
│   ├── AppRouter.jsx
│   ├── ProtectedRoute.jsx
│   └── routes.js
│
├── App.jsx                    # root component
└── main.jsx                   # entry point
```

---

# CHAPTER 21 — PERFORMANCE OPTIMIZATION PATTERNS

## Optimization Checklist

**1 — Use React DevTools Profiler** to identify which components re-render unnecessarily before optimizing.

**2 — Key-based optimization for lists:**

```jsx
// Always use stable, unique IDs as keys
{items.map(item => <Item key={item.id} {...item} />)}
```

**3 — Avoid creating objects/arrays in JSX:**

```jsx
// BAD — new object created on every render, causes child re-render:
<Component style={{ color: 'red' }} data={[1, 2, 3]} />

// GOOD — stable references:
const style = useMemo(() => ({ color: 'red' }), [])
const data = useMemo(() => [1, 2, 3], [])
<Component style={style} data={data} />
```

**4 — Virtualize long lists:**

For lists with thousands of items, only render what is visible on screen:

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  )

  return (
    <FixedSizeList
      height={500}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

**5 — Lazy load images:**

```jsx
function LazyImage({ src, alt }) {
  return <img src={src} alt={alt} loading="lazy" />
}
```

---

# CHAPTER 22 — DEPLOYMENT

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized, minified files.

## Deploying to Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects React/Vite and configures everything.

## Deploying to Netlify

Drag and drop your `dist/` folder to netlify.com/drop, or:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Environment Variables

```bash
# .env.local (never commit to git):
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-secret-key
```

```jsx
// Access in code:
const API_URL = import.meta.env.VITE_API_URL
```

In Vite, all environment variables must start with `VITE_` to be accessible in the browser.

## SPA Routing Fix for Deployment

React Router works on the client side. When you deploy and someone refreshes on `/dashboard`, the server looks for a `/dashboard` file — which doesn't exist. You need to redirect all requests to `index.html`.

**Netlify — create `public/_redirects`:**

```
/*    /index.html    200
```

**Vercel — create `vercel.json`:**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

# COMPLETE ROADMAP SUMMARY

```
BEGINNER
  ✅ What is React, Virtual DOM, Reconciliation
  ✅ JSX — rules, expressions, conversion to JS
  ✅ Components — functional, class, composing
  ✅ Props — passing data, children, default props
  ✅ State — useState, updating objects/arrays
  ✅ Event Handling — synthetic events, event object
  ✅ Conditional Rendering — ternary, &&, early return
  ✅ Lists and Keys — map(), why keys matter

INTERMEDIATE
  ✅ useEffect — all three forms, cleanup, data fetching
  ✅ Forms — controlled/uncontrolled, validation
  ✅ Lifting State Up — sibling communication
  ✅ React Router — routes, params, navigate, nested, protected

ADVANCED
  ✅ useRef — DOM access, mutable values
  ✅ useMemo and useCallback — memoization
  ✅ Custom Hooks — extract reusable logic
  ✅ Context API — avoid prop drilling, auth/theme
  ✅ Error Boundaries — catch and handle crashes
  ✅ Code Splitting — lazy loading, Suspense

EXPERT
  ✅ Redux Toolkit — slices, store, async thunks
  ✅ API Layer — centralized services, error handling
  ✅ Authentication Flow — login, logout, protected routes
  ✅ Folder Structure — industry standard
  ✅ Performance Optimization — memo, virtualization
  ✅ Deployment — Vercel, Netlify, environment variables
```

---

# CAPSTONE PROJECT — BUILD THIS

Build a complete **Task Management App** that uses everything covered:

```
Features:
  ✓ Login/Register with protected routes
  ✓ Dashboard with task lists
  ✓ Create, update, delete tasks
  ✓ Filter tasks by status and category
  ✓ Search with debouncing
  ✓ Dark/light theme with Context
  ✓ Persist data with localStorage or real API
  ✓ Loading and error states throughout
  ✓ Responsive design

Technical requirements:
  ✓ React Router for navigation
  ✓ Context for auth and theme
  ✓ Custom hooks for API calls
  ✓ Redux for task state management
  ✓ Form validation
  ✓ Performance: memo and lazy loading
  ✓ Deployed on Vercel or Netlify
```

This project will touch every concept in this guide. Build it feature by feature, not all at once. Each feature you add will solidify a concept from this guide in a way reading alone cannot.