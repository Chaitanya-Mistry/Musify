import { Artist } from "./Artist";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UserLoginContext from "../../App";

export const DisplayArtists = ({ selectArtist, setArtist }) => {
    const [artists, setArtists] = useState([]);
    const [noArtists, setNoArtists] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(false);
    const { serverEndPoint } = useContext(UserLoginContext);

    // Fetch all artists
    const fetchAllArtists = async () => {
        const baseURL = `${serverEndPoint}/getAllArtists`; // Our API server 
        let response;

        // Get Request
        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
        }

        // if artists were not created by admin
        if (response.data.serverResponse.responseCode === 204) {
            setNoArtists(true);
        } else {
            setArtists(response.data.serverResponse.responseData);
        }
    }

    const finalArtistSelected = () => {
        setArtist(selectedArtist);
    }

    const displaySelectCheckMark = (event) => {
        const artistImage = event.target;
        // If admin clicks on artist image
        if (artistImage.hasAttribute("src")) {
            let artistName;
            // Toggle between class name (Add or Remove class name)
            artistImage.classList.toggle("tickArtist");
            if (artistImage.matches('.tickArtist')) {
                // Capture Artist Name
                artistName = event.target.parentElement.parentElement.getElementsByClassName("artistName")[0].innerText;
                setSelectedArtist(artistName);
            } else {
                artistName = "";
                setSelectedArtist("");
            }
        }
    }
    useEffect(() => {
        fetchAllArtists();
        // if admin wants to select an artist for a song
        if (setArtist) {
            const artistListContainer = document.getElementsByClassName("artistListContainer")[0];
            artistListContainer.addEventListener("click", displaySelectCheckMark);
        }
    }, []);

    if (noArtists) {
        return (
            <main>
                <h2>No Artists to display 😶</h2>
            </main>
        )
    } else {
        const allArtists = artists.map((currentArtist, index) => {
            return <Artist artistData={currentArtist} key={index} fetchArtist={fetchAllArtists} />
        });
        return (
            <>
                {
                    selectArtist ?
                        <div className="showArtist">
                            {/* List of artists */}
                            <div className="artistListMainContainer">
                                {/* <h3 style={{ marginBottom: "10px" }}>List of artists</h3> */}
                                <div className="artistListContainer">
                                    {/* Dynamically generated */}
                                    {allArtists}
                                </div>
                                {selectedArtist ? <button className="selectArtistBtn" onClick={finalArtistSelected}>Done</button> : ""}
                            </div>
                        </div>
                        : <main><div className="mainArtistContainer">
                            {/* List of artists */}
                            <div className="artistListMainContainer">
                                {/* <h3 style={{ marginBottom: "10px" }}>List of artists</h3> */}
                                <div className="artistListContainer">
                                    {/* Dynamically generated */}
                                    {allArtists}
                                </div>
                                {selectedArtist ? <button className="selectArtistBtn" onClick={finalArtistSelected}>Done</button> : ""}
                            </div>
                        </div>
                        </main>
                }
            </>
        )
    }
}