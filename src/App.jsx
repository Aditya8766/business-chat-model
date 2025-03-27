import React from 'react';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './whatsapp-dashboard/dashBoard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/signin" element={
              <SignIn />
          }/>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
