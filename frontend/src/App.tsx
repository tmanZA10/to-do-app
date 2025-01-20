import { useState } from "react";
import mongo from './assets/MongoDB-Logo-5.svg'
import r from './assets/react.svg'
import ts from './assets/Typescript_logo.png'
import sb from './assets/SpringBoot.jpg'


function App() {

  const [message, setMessage] = useState("")
  
  fetch("http://localhost:8080")
  .then( r => r.text()
  )
  .then(
    d => setMessage(d)
  )

  console.log("haha");
  
  

  return (
    <div>
      <h1>FullStack ToDo App</h1>
      <p>{message}</p>
      <p>MongoDB for Database</p>
      <div className="imgs">
        <img src={r} alt="" />
        <img src={ts} alt="" />
        <img src={sb} alt="" />
        <img src={mongo} alt="" />
      </div>
    </div>
  )
}

export default App
