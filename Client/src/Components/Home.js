import { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../App";
import { StackLayout } from "./StackLayout";
import { genre } from "./ListContent";
import { Audio } from "./Audio";
import axios from "axios";

export const Home = () => {
    const { isLoggedIn, isAdminLoggedIn, loggedInUserData } = useContext(UserLoginContext);
    const [fetchedSongs, setFetchedSongs] = useState([]);

    // Fetch Demo Songs
    const fetchDemoSongs = async () => {
        // GET request to our API server .. ⬆
        const baseURL = 'http://localhost:4000/getSampleSongs';
        let response;

        try {
            response = await axios.get(baseURL);
        } catch (err) {
            response = err.response;
        }

        if (response.data.serverResponse.responseCode === 200) {            
            setFetchedSongs(response.data.serverResponse.responseData);            
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }
    useEffect(() => {
        fetchDemoSongs();
    }, []);

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
                        <StackLayout list={genre} ></StackLayout>
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
                    <h1>Demo Songs</h1>
                    {fetchedSongs ? fetchedSongs.map((currentSong) => <Audio songData={currentSong} key={currentSong._id} />) : ""}
                </div>

                {/* About Team Members 🧑‍🤝‍🧑*/}
                <div id="mainTeamMembersContainer">
                    <h1>Meet Our Developers</h1>
                    <div className="members">
                        {/* Member Image */}
                        <section className="memberImageContainer">
                            <img src="../../../Images/Chaitanya.JPG" alt="" loading="lazy" />
                        </section>
                        <strong className="memberName">Chaitany Mistry</strong> <br />
                        <strong className="memberOccupation">JavaScript Developer</strong>
                        {/* Social Media Links */}
                        <div className="memberContact">
                            <a href="https://www.linkedin.com/in/chaitanya-mistry-6b536322a" target="_blank">
                                <span className="fa-brands fa-linkedin faIcons" style={{ color: "dodgerblue" }}></span>
                            </a>
                            <a href="https://github.com/Chaitanya-Mistry" target="_blank">
                                <span className="fa-brands fa-github faIcons" style={{ color: "rgb(213, 213, 213)" }} />
                            </a>
                            <a href="mailto:chaitanyam688@gmail.com">
                                <span className="fa fa-envelope faIcons" style={{ color: "red" }} />
                            </a>
                        </div>
                    </div>
                    <div className="members">
                        {/* Member Image */}
                        <section className="memberImageContainer">
                            <img src="../../../Images/Slider1.jpg" alt="" loading="lazy" />
                        </section>
                        <strong className="memberName">Jaypal Sinh</strong> <br />
                        <strong className="memberOccupation">Developer</strong>
                        {/* Social Media Links */}
                        <div className="memberContact">
                            <span className="fa-brands fa-linkedin faIcons" style={{ color: "dodgerblue" }} />
                            <span className="fa-brands fa-github faIcons" style={{ color: "rgb(213, 213, 213)" }} />
                            <span className="fa fa-envelope faIcons" style={{ color: "red" }} />
                        </div>

                    </div>
                    <div className="members">
                        {/* Member Image */}
                        <section className="memberImageContainer">
                            <img src="../../../Images/Slider2.jpg" alt="" loading="lazy" />
                        </section>
                        <strong className="memberName">Hevin Patel</strong> <br />
                        <strong className="memberOccupation">Developer</strong>
                        {/* Social Media Links */}
                        <div className="memberContact">
                            <span className="fa-brands fa-linkedin faIcons" style={{ color: "dodgerblue" }} />
                            <span className="fa-brands fa-github faIcons" style={{ color: "rgb(213, 213, 213)" }} />
                            <span className="fa fa-envelope faIcons" style={{ color: "red" }} />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}