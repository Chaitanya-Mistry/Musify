import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserLoginContext } from "../App";

export const LoginAdmin = () => {
    const { isLoggedIn, setLogIn } = useContext(UserLoginContext);

    // To Navigate to a different component 
    const navigate = useNavigate();

    // Login Form Submit Event Handler 
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Store admin credentials 
        const userLoginCredentials = {
            adminEmail: event.target["adminEmail"].value,
            adminPassword: event.target["adminPassword"].value
        }

        // Sending POST request to our API server ...
        const baseURL = 'http://localhost:4000/adminLogin';
        let response;

        try {
            response = await axios.post(baseURL, {
                email: userLoginCredentials.adminEmail,
                password: userLoginCredentials.adminPassword
            }, { withCredentials: true }); // To send cookies data to our API server ..
        } catch (err) {
            response = err.response;
        }

        if (response.data.serverResponse.responseCode === 200) {
            alert(`${response.data.serverResponse.message}`);
            setLogIn(true);
            navigate("/", { state: "Admin" }); // Navigate to the Admin's home page .. 
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }

    return (
        <main>
            <div id="loginContainer">
                {/* For admin login illustration */}
                <div id="loginImage">
                    {/* <a href="https://www.freepik.com/free-vector/system-administrators-sysadmins-are-servicing-server-racks-system-administration-upkeeping-configuration-computer-systems-networks-concept-pinkish-coral-blue-palette-vector-illustration_11667102.htm#query=admin&position=30&from_view=keyword">Image by vectorjuice</a> on Freepik */}
                    {/* Image provided by www.freepik.com */}
                    <img src="https://img.freepik.com/free-vector/system-administrators-sysadmins-are-servicing-server-racks-system-administration-upkeeping-configuration-computer-systems-networks-concept-pinkish-coral-blue-palette-vector-illustration_335657-1642.jpg?w=1060&t=st=1669062729~exp=1669063329~hmac=a69f2d5a811175e060cf57152452f10deed05ecf6120b96059f046ba82ab9fcd" alt="admin login illustration" />
                </div>
                {/* To enter login details */}
                <div id="loginDetails">
                    <h2 id="loginTitle">Admin Sign In</h2>
                    <form onSubmit={handleSubmit} id="loginForm">

                        <input type="email" name="adminEmail" id="adminEmail" placeholder="📧 Admin Email" required />
                        <input type="password" name="adminPassword" id="adminPassword" placeholder="🔐 Password" required />
                        <button>Log in</button>
                    </form>
                </div>
            </div>
        </main>
    )
}