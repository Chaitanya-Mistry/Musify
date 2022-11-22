import { useContext } from "react";
import { UserLoginContext } from "../App";

export const Home = () => {
    const { isLoggedIn, isAdminLoggedIn, loggedInUserData } = useContext(UserLoginContext);

    // if user is logged in greet them
    if (isLoggedIn) {
        // Admin
        if (isAdminLoggedIn) {
            return (
                <>
                    <main>
                        <h2>Welcome Admin {loggedInUserData?.name}🦸‍♂️</h2>
                    </main>
                </>
            )
        } else {
            return (
                <>
                    <main>
                        <h2>Welcome User {loggedInUserData?.name}</h2>
                    </main>
                </>
            )
        }

    } else {
        return (
            <main>
                <h1 id='homePage'>
                    Welcome to the Musify <br />
                </h1>
            </main>
        )
    }
}