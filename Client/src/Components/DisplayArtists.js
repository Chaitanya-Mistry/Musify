import { Artist } from "./Artist";
import axios from "axios";
import { useEffect, useState } from "react";

export const DisplayArtists = () => {
    const [artists, setArtists] = useState([]);
    const [noArtists, setNoArtists] = useState(false);

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

    useEffect(() => {
        fetchAllArtists();
    }, []);

    if (noArtists) {
        return (
            <main>
                <h2>No Artists to display 😶</h2>
            </main>
        )
    } else {
        const allArtists = artists.map((currentArtist, index) => {
            return <Artist artistData={currentArtist} key={index}/>
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
                        </div>
                    </div>
                </main>
            </>
        )
    }
}