import './App.css';
import Home from './components/Login/Home';
import Login from './components/Login/Login';
import {Routes,Route} from "react-router-dom";
import React ,{useContext}from 'react';
import SignUp from './components/Login/SignUp';
import ForgotPassword from './components/Login/ForgotPassword';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
