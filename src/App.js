import './App.css';
import LoginPrompt from "./components/loginprompt";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatientButton from './components/addButton';

import Works from './components/success';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LoginPrompt />} />
          <Route path = "/SignUp" element = {<SignUp />} />
          <Route path = "/AddPatientButton" element = {<AddPatientButton />} />
          <Route path = "/success" element = {<Works />} />
        </Routes>
  </BrowserRouter>
  );
}

export default App;
