import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Adimn.jsx'
import Test from './pages/Test.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
   
    <BrowserRouter>
      <div className='w-full h-screen bg-primmary text-secondary'>
      <Routes path="/">
        <Route path='/*'element={<Homepage/>}/>
        <Route path='/loging'element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
      </div>
    </BrowserRouter>
      // <Header/>
      // <Productcard name="Laptop" price="LKR 100,000" image="https://picsum.photos/id/0/367/267" />
      // <Productcard name="phone" price="LKR 50,000" image="https://picsum.photos/id/2/367/267" />
      // <Productcard name="Tablet" price="LKR 70,000" image="https://picsum.photos/id/3/367/267" />
    
  )
}

export default App
