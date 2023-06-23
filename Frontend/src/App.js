
import './App.css';
// import Footer from './MyComponents/Footer'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react'
import NavBar from './MyComponents/NavBar';
import NoteState from './context/notes/NoteState';
import  About from './MyComponents/About';
import  Home  from './MyComponents/Home';
import Alert from './MyComponents/Alert';
import Login from './MyComponents/Login';
import Signup from './MyComponents/Signup';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState(null) 
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)},1500)
  }
    return (
      <div>
      <NoteState>
      <Router>
        <NavBar />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
      </NoteState>
    </div>
      
    )
  }

  export default App;

