//import './App.css';
import LoginPrompt from "./components/loginprompt";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatientButton from './components/addButton';

import Nav from "./components/Navbar";
import View from "./components/States_Views";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Nav />} />
          <Route path = "/Login" element = {<LoginPrompt />} />
          <Route path = "/SignUp" element = {<SignUp />} />
          <Route path = "/AddPatientButton" element = {<AddPatientButton />} />
          <Route path = "/View" element = {<View />} />
        </Routes>
  </BrowserRouter>
  );
}

export default App;
