import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

function App() {
  return(
    <RegisterForm/>
  )
  
}

export default App;

{/* <Switch>
      <Route path="/login-form" render={() => <LoginForm/>}/>
      <Route path="/register-form" render={() => <RegisterForm/>}/>
    </Switch> */}