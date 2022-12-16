import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { Navbar } from './Components/Navbar';
import { CMP404 } from './Components/404';
import { Home } from './Components/Home';
import { createContext, useEffect, useState } from 'react';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Footer } from './Components/Footer';
import { LoginAdmin } from './Components/loginAdmin';
import { ManageArtist } from './Components/Admin_Components/ManageArtist';
import { ManageSong } from './Components/Admin_Components/ManageSong';
import axios from 'axios';
import { DisplayArtists } from './Components/Admin_Components/DisplayArtists';
import SyncLoader from "react-spinners/SyncLoader";
import { DisplaySongs } from './Components/Admin_Components/DisplaySongs';
import { EditArtist } from './Components/Admin_Components/EditArtist';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Donation } from './Components/Donation';

const UserLoginContext = createContext();

function App() {
  const [loading, setloading] = useState(false);
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
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000);
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
      {
        loading ?

          <div className='splashload'>

            <img src="https://cdn-icons-png.flaticon.com/512/2829/2829076.png" alt="site logo" width="90" />
            <h1 id="siteLogo">Musify</h1>

            <SyncLoader
              color={"blue"}
              loading={loading}
              size={20}
              left-margin={"20px"}
              aria-label="Loading Spinner"
              data-testid="loader"
            />

          </div>
          :
          <>
            <UserLoginContext.Provider value={{ isLoggedIn, setLogIn, isAdminLoggedIn, setAdminLogIn, loggedInUserData, setLoggedInUserData }}>
              {/* <Navbar /> */}
              <ResponsiveAppBar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/loginAdmin' element={<LoginAdmin />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/donate' element={<Donation />} />
                {isAdminLoggedIn ? <Route path='/manageArtist' element={<ManageArtist />} /> : ""}
                {isAdminLoggedIn ? <Route path='/manageSong' element={<ManageSong />} /> : ""}
                {isAdminLoggedIn ? <Route path='/editArtist' element={<EditArtist />} /> : ""}
                {isAdminLoggedIn ? <Route path='/displayArtists' element={<DisplayArtists />} /> : ""}
                {isAdminLoggedIn ? <Route path='/displaySongs' element={<DisplaySongs />} /> : ""}
                <Route path='*' element={<CMP404 />} />  {/* 404 error page */}
              </Routes>
            </UserLoginContext.Provider>
            <Footer />
          </>
      }
    </>
  );
}

export default App;
export { UserLoginContext };
