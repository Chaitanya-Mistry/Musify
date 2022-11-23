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
import { ManageArtist } from './Components/ManageArtist';
import { ManageSong } from './Components/ManageSong';
import axios from 'axios';
import { DisplayArtist } from './Components/DisplayArtist';

const UserLoginContext = createContext();

function App() {
  const [isLoggedIn, setLogIn] = useState();
  const [isAdminLoggedIn, setAdminLogIn] = useState();
  const [loggedInUserData, setLoggedInUserData] = useState();

  const adminLogInVerifier = async () => {
    console.log("Admin log in verifier ❤️‍🔥");
    // Sending POST request to our API server .. ⬆
    const baseURL = 'http://localhost:4000/adminTokenVerifier';
    let response;

    try {
      response = await axios.post(baseURL, {}, { withCredentials: true }); // To send cookies data to our API server ..
    } catch (err) {
      response = err.response;
    }

    if (response.data.serverResponse.responseCode === 200) {
      setLogIn(true);
      setAdminLogIn(true); // user log in with admin type
    } else {
      // Logout if not valid admin
      setLogIn(false);
      setAdminLogIn(false);
    }
  }

  useEffect(() => {
    // Check whether user is already logged in or not to prevent him/her to re-login every-time
    if (document.cookie.split("=")[0] === "jwtoken") {
      setLogIn(true); // user log in without admin type
    } else if (document.cookie.split("=")[0] === "jwtokenn") {
      // Verify admin token ...
      adminLogInVerifier();
    } else {
      setLogIn(false);
      setAdminLogIn(false);
    }
  }, []);

  return (
    // Basic Web Page Layout goes here without login..
    <>
      <UserLoginContext.Provider value={{ isLoggedIn, setLogIn, isAdminLoggedIn, setAdminLogIn, loggedInUserData, setLoggedInUserData }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loginAdmin' element={<LoginAdmin />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signUp' element={<SignUp />} />
          {isAdminLoggedIn ? <Route path='/manageArtist' element={<ManageArtist />} /> : ""}
          {isAdminLoggedIn ? <Route path='/manageSong' element={<ManageSong />} /> : ""}
          {isAdminLoggedIn ? <Route path='/displayArtists' element={<DisplayArtist />} /> : ""}
          <Route path='*' element={<CMP404 />} />  {/* 404 error page */}
        </Routes>
      </UserLoginContext.Provider>
      <Footer />
    </>
  );
}

export default App;
export { UserLoginContext };
