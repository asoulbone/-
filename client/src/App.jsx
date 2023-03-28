import { useState } from 'react'
import Navbar from './Navbar'
import LoginBox from './LoginBox'
import Register from './Register'

function App() {

  return (
    <div className="App">
      <Navbar/>
      {/* <LoginBox/> */}
      <Register/>
    </div>
  )
}

export default App
