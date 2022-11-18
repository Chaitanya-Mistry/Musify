import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {

    // To Navigate to a different component 
    const navigate = useNavigate();

    // Submit event handler of sign up form
    const handleSubmit = async (event) => {
        const baseURL = 'http://localhost:4000/createUser'; // Our API server 

        event.preventDefault();

        const uPass = event.target["userPassword"].value;
        const uPassAgain = event.target["userPasswordAgain"].value;

        //  Match the both passwords @Client Side 
        if (uPass === uPassAgain) {
            // Store user credentials in an object ..
            const userData = {
                userName: event.target["userName"].value,
                userEmail: event.target["userEmail"].value,
                userPassword: event.target["userPassword"].value
            }

            let response;
            // // Sending POST Request to our API Server
            try {
                response = await axios.post(baseURL, {
                    name: userData.userName,
                    email: userData.userEmail,
                    password: userData.userPassword
                });
            } catch (err) {
                response = err.response;
            }

            // IF a user registered successfully , Navigate to Sign in component .. 
            if (response.data.serverResponse.responseCode === 201) {
                alert('Registration completed ');
                navigate("/login", { state: userData });
            }
            // If user is already registered ask him/her to login 
            else if (response.data.serverResponse.responseCode === 200 && response.data.serverResponse.success === false) {
                alert(`${response.data.serverResponse.message}`);
                navigate('/login', { state: userData });
            } else {
                alert(`ERROR  ${response.data.serverResponse.message}`);
            }

        } else {
            alert('Password is not matched .. ');
            event.target["userPasswordAgain"].focus();
        }
    }
    return (
        <main>
            <div id="signUpContainer">
                {/* For login illustration */}
                <div id="signUpImage">
                    {/* <a href="https://www.freepik.com/free-vector/sign-page-abstract-concept-illustration_11668754.htm#query=user%20registration&position=0&from_view=search&track=sph">Image by vectorjuice</a> on Freepik */}
                    {/* Image provided by https://www.freepik.com */}

                    <img src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?w=740&t=st=1668738244~exp=1668738844~hmac=c90918c25d95970d2aeffbbec9d8eba922d0c5f919edccbe8cb289a5b155ee45" alt="sign up illustration" />
                </div>
                {/* To enter sign up details */}
                <div id="signUpDetails">
                    <h2 id="signUpTitle">Sign Up</h2>

                    <form id="signUpForm" onSubmit={handleSubmit}>
                        <input type="text" name="userName" id="userName" placeholder="Your Name" required />
                        <input type="email" name="userEmail" id="userEmail" placeholder="Your Email" required />
                        <input type="password" name="userPassword" id="userPassword" placeholder="Password" minLength={6} required />
                        <input type="password" name="userPasswordAgain" id="userPasswordAgain" placeholder="Confirm password" minLength={6} required />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </main>
    )
}