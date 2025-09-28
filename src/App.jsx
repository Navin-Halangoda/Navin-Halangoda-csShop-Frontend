import { useState } from 'react'
import './App.css'
import Productcard from './component/Productcard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Productcard name="Laptop" price="LKR 100,000" image="https://picsum.photos/id/0/367/267" />
     <Productcard name="phone" price="LKR 50,000" image="https://picsum.photos/id/2/367/267" />
      <Productcard name="Tablet" price="LKR 70,000" image="https://picsum.photos/id/3/367/267" />

     
    </>
  )
}

export default App
