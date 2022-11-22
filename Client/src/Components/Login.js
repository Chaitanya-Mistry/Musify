import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserLoginContext } from "../App";

export const Login = () => {
    const { isLoggedIn, setLogIn, setLoggedInUserData } = useContext(UserLoginContext);

    // To Navigate to a different component 
    const navigate = useNavigate();

    const locationData = useLocation(); // To get the data from sign up page 
    let userData = null;
    if (locationData.state) {
        userData = locationData.state; // Store user data 
    }
    // Login Form Submit Event Handler 
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Store user credentials 
        const userLoginCredentials = {
            userEmail: event.target["userEmail"].value,
            userPassword: event.target["userPassword"].value
        }

        // Sending POST request to our API server .. ⬆
        const baseURL = 'http://localhost:4000/login';
        let response;

        try {
            response = await axios.post(baseURL, {
                email: userLoginCredentials.userEmail,
                password: userLoginCredentials.userPassword
            }, { withCredentials: true }); // To send cookies data to our API server ..
        } catch (err) {
            response = err.response;
        }

        if (response.data.serverResponse.responseCode === 200) {
            alert(`${response.data.serverResponse.message}`);
            setLogIn(true);
            setLoggedInUserData(response.data.serverResponse.responseData);
            navigate("/"); // Navigate to the user's home page .. 
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }

    return (
        <main>
            <div id="loginContainer">
                {/* For login illustration */}
                <div id="loginImage">
                    {/* <a href="https://www.freepik.com/free-vector/sign-concept-illustration_13123598.htm#query=sign%20in%20illustration&position=9&from_view=search&track=sph">Image by storyset</a> on Freepik */}
                    {/* Image provided by www.freepik.com */}
                    <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg?w=740&t=st=1668738187~exp=1668738787~hmac=9f90174f02634b453f9d1d59ea86ac5f592d38c35535606203dc7e15b005b97b" alt="login illustration" />
                </div>
                {/* To enter login details */}
                <div id="loginDetails">
                    <h2 id="loginTitle">Sign In</h2>
                    <form onSubmit={handleSubmit} id="loginForm">

                        <input type="email" name="userEmail" id="userEmail" defaultValue={userData ? userData.userEmail : ""} placeholder="Your Email" required />
                        <input type="password" name="userPassword" id="userPassword" defaultValue={userData ? userData.userPassword : ""} placeholder="Password" required />
                        <button>Log in</button>

                        {/* Facebook Github LinkedIn */}

                        <div id="otherLoginOptions">
                            <strong style={{ fontSize: "21px" }}>or</strong> <br />
                            <span className="fa-brands fa-facebook faIcons" style={{ color: "dodgerblue" }} />
                            <span className="fa-brands fa-github faIcons" style={{ color: "purple" }} />
                            <span className="fa-brands fa-google faIcons" style={{ color: "red", fontSize: "21.4px" }} />
                        </div>

                    </form>
                </div>
            </div>
        </main>
    )
}