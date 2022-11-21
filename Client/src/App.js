import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { CMP404 } from './Components/404';
import { Home } from './Components/Home';
import { createContext, useEffect, useState } from 'react';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Footer } from './Components/Footer';
import { LoginAdmin } from './Components/loginAdmin';

const UserLoginContext = createContext();

function App() {
  const [isLoggedIn, setLogIn] = useState();
  const [isAdminLoggedIn, setAdminLogIn] = useState();

  return (
    // Basic Web Page Layout goes here without login..
    <>
      <UserLoginContext.Provider value={{ isLoggedIn, setLogIn,isAdminLoggedIn, setAdminLogIn }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loginAdmin' element={<LoginAdmin />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='*' element={<CMP404 />} />  {/* 404 error page */}
        </Routes>
      </UserLoginContext.Provider>
      <Footer />
    </>
  );
}

export default App;
export {UserLoginContext};
