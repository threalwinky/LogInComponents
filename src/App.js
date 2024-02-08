import './App.css';
import "primeflex/primeflex.css";

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Users from './components/Users'
import Dashboard from './components/Dashboard'
import NotFound from './components/404NotFound';
import Store from './components/Store'
import Chat from './components/Chat';

function App() {
  //git check
  return (

    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
