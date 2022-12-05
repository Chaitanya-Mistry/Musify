import { useContext } from "react";
import { UserLoginContext } from "../App";
import { StackLayout } from "./StackLayout";
import { genre } from "./ListContent";

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
                        {/* <h2>Welcome User {loggedInUserData?.name}</h2> */}
                        <StackLayout list={genre}></StackLayout>
                    </main>
                </>
            )
        }

    } else {
        return (
            <main>
                <h1 className="componentTitle">Wide range of song genre</h1>
                <StackLayout list={genre}></StackLayout>
                {/* Featured Artist */}
                <div id="featuredArtist">
                    <h1>Featured artists</h1>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669322507000_Shreya_Goshal_Twitter (2).jfif`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Shreya Goshal</strong>
                    </div>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669321850637_Photo by Elizeu Dias on Unsplash.jpg`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Barra da Tijuca</strong>
                    </div>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669323635305_Shaan_Facebook.jpg`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Shaan</strong>
                    </div>
                    <div className="artist">
                        {/* Artist Image */}
                        <section className="artistImageContainer">
                            <img src={`http://localhost:4000/Artist_Image/1669321965384_Photo by Claudia Raya on Unsplash.jpg`} alt="" loading="lazy" />
                        </section>
                        <strong className="artistName">Claudia Raya</strong>
                    </div>
                </div>
                {/* Songs */}
                <div id="featuredSong">
                    {/* <audio controls> */}
                    <audio src="../../../Music/nimue-the-lady-of-the-lake-medieval-love-ballad-5638.mp3" controls></audio>
                </div>
            </main>
        )
    }
}