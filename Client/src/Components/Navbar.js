import axios from "axios";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserLoginContext } from "../App";

export function Navbar() {
    const { isLoggedIn, setLogIn, isAdminLoggedIn, setAdminLogIn } = useContext(UserLoginContext);
    const navigate = useNavigate();

    // Logout functionality ..
    const allowUserToLogout = async (event) => {
        event.preventDefault();

        const baseURL = 'http://localhost:4000/logout'; // Our API server 
        let response;

        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
        }

        if (response.status === 200) {
            setLogIn(false); // set user login status
            setAdminLogIn(false); // set admin login status
            navigate('/'); // Navigate to default home page after log out .. 
        } else {
            alert('ERROR in logout ..', response);
        }
    }

    if (isLoggedIn) {

        // Admin
        if (isAdminLoggedIn) {
            return (
                <>
                    <header>
                        <div className="logo">
                            {/* Site Logo */}
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                {/* https://www.flaticon.com/free-icon/listen_2829076?term=music&related_id=2829076 */}
                                {/* Image provided by https://www.flaticon.com/ */}
                                <div id="siteLogoContainer">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2829/2829076.png" alt="site logo" width="45" />
                                    <h1 id="siteLogo">Musify</h1>
                                </div>
                            </NavLink>
                        </div>
                        <nav>
                            <div className="navlist"><NavLink to='/'>Home</NavLink></div>
                            <div className="navlist"><NavLink to='/manageArtist'>Manage Artist</NavLink></div>
                            <div className="navlist"><NavLink to='/manageSong'>Manage Song</NavLink></div>
                            <div className="navlist"><NavLink to='' onClick={allowUserToLogout}>Logout</NavLink></div>
                        </nav>
                    </header>
                </>
            )
        } else {
            return (
                <>
                    <header>
                        <div className="logo">
                            {/* Site Logo */}
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                {/* https://www.flaticon.com/free-icon/listen_2829076?term=music&related_id=2829076 */}
                                {/* Image provided by https://www.flaticon.com/ */}
                                <div id="siteLogoContainer">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2829/2829076.png" alt="site logo" width="45" />
                                    <h1 id="siteLogo">Musify</h1>
                                </div>
                            </NavLink>
                        </div>
                        <nav>
                            <div className="navlist"><NavLink to='/'>Home</NavLink></div>
                            <div className="navlist"><NavLink to='/myFavSongs'>My Favourite Songs</NavLink></div>
                            <div className="navlist"><NavLink to='/serchSongs'>Search Songs</NavLink></div>
                            <div className="navlist"><NavLink to='/myAccount'>My Account</NavLink></div>
                            <div className="navlist"><NavLink to='' onClick={allowUserToLogout}>Logout</NavLink></div>
                        </nav>
                    </header>
                </>
            )
        }

    } else {
        return (
            <>
                <header>
                    <div className="logo">
                        {/* Site Logo */}
                        <NavLink to="/" style={{ textDecoration: 'none' }}>
                            {/* https://www.flaticon.com/free-icon/listen_2829076?term=music&related_id=2829076 */}
                            {/* Image provided by https://www.flaticon.com/ */}
                            <div id="siteLogoContainer">
                                <img src="https://cdn-icons-png.flaticon.com/512/2829/2829076.png" alt="site logo" width="45" />
                                <h1 id="siteLogo">Musify</h1>
                            </div>
                        </NavLink>
                    </div>
                    <nav>
                        <div className="navlist"><NavLink to='/'>Home</NavLink></div>
                        <div className="navlist"><NavLink to='/login'>Login</NavLink></div>
                        <div className="navlist"><NavLink to='/loginAdmin'>Admin Login</NavLink></div>
                        <div className="navlist"><NavLink to='/signUp'>Sign Up</NavLink></div>
                    </nav>
                </header>
            </>
        );
    }
}
