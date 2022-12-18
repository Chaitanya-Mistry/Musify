import { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../App";
import { GridLayout } from "./GridLayout";
import { developer, genre } from "./ListContent";
import { Audio } from "./Audio";
import { Developer } from "./Developer.js";
import axios from "axios";

export const Home = () => {
    const { isLoggedIn, isAdminLoggedIn, loggedInUserData, serverEndPoint } = useContext(UserLoginContext);
    const [fetchedSongs, setFetchedSongs] = useState([]);
    const [fetchedArtist, setFetchedArtist] = useState([]);

    // Fetch Demo Songs
    const fetchDemoSongs = async () => {
        // GET request to our API server .. ⬆
        const baseURL = `${serverEndPoint}/getSampleSongs`;
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

    const fetchArtist = async () => {
        const baseURL = `${serverEndPoint}/getAllArtists`;
        let response;

        try {
            response = await axios.get(baseURL);
        } catch (err) {
            response = err.response;
        }

        if (response.data.serverResponse.responseCode === 200) {
            setFetchedArtist(response.data.serverResponse.responseData);
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }
    useEffect(() => {
        fetchDemoSongs();
        fetchArtist();
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
                        <GridLayout list={genre} alt="" ></GridLayout>
                    </main>
                </>
            )
        }

    } else {
        const data = fetchedArtist.map((currArtist, index) => <div className="artist">
            {/* Artist Image */}
            <section className="artistImageContainer">
                <img src={currArtist.artist_image} alt={currArtist.artist_name} />
            </section>
            <strong className="artistName">{currArtist.artist_name}</strong>
        </div>)

        return (

            <main>
                <h1 className="componentTitle">Wide range of song genre</h1>
                <GridLayout list={genre}></GridLayout>
                {/* Featured Artist */}
                <div id="featuredArtist">
                    <h1>Featured artists</h1>
                    {data}

                </div>

                
                {/* Songs */}
                <div id="featuredSong">
                    <h1>Demo Songs</h1>
                    {/* Dynamic Rendering */}
                    {fetchedSongs ? fetchedSongs.map((currentSong) => <Audio songData={currentSong} key={currentSong._id} />) : ""}
                </div>

                {/* About Team Members 🧑‍🤝‍🧑*/}
                <div id="mainTeamMembersContainer">
                    <h1>Meet Our Developers</h1>
                    {/* Dynamic Rendering */}
                    {developer.map((currentDeveloper) => <Developer devData={currentDeveloper} key={currentDeveloper.gitHub} />)}
                </div>

            </main>
        )
    }
}