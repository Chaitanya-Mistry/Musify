import { Artist } from "./Artist";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const DisplayArtists = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();
    const [noArtists, setNoArtists] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(false);
    const location = useLocation();

    // Fetch all blogs
    const fetchAllArtists = async () => {
        const baseURL = 'http://localhost:4000/getAllArtists'; // Our API server 
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

    // Move back to the add song page
    const sendSelectedArtist = () => {
        navigate("/manageSong",{state:selectedArtist}); // Navigate to the manage song component
    }
    useEffect(() => {
        fetchAllArtists();
        // if admin wants to select an artist for a song
        if (location.state) {
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
            return <Artist artistData={currentArtist} key={index} />
        });
        return (
            <>
                <main>
                    <div className="mainArtistContainer">
                        {/* List of artists */}
                        <div className="artistListMainContainer">
                            {/* <h3 style={{ marginBottom: "10px" }}>List of artists</h3> */}
                            <div className="artistListContainer">
                                {/* Dynamically generated */}
                                {allArtists}
                            </div>
                            {selectedArtist ? <button onClick={sendSelectedArtist}>Done</button> : ""}
                        </div>
                    </div>
                </main>
            </>
        )
    }
}