import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Song } from "./Song";
import {UserLoginContext} from "../../App";

export const DisplaySongs = () => {
    const [songs, setSongs] = useState([]);
    const [noSongs, setNoSongs] = useState(false);
    const { serverEndPoint } = useContext(UserLoginContext);

    // Fetch all songs
    const fetchAllSongs = async () => {
        const baseURL = `${serverEndPoint}/getAllSongs`; // Our API server 
        let response;

        // Get Request
        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
        }

        // if songs were not uploaded by admin
        if (response.data.serverResponse.responseCode === 204) {
            setNoSongs(true);
        } else {
            if(response.data.serverResponse.responseData.length > 0){
                setSongs(response.data.serverResponse.responseData);
                setNoSongs(false);
            }else{
                setNoSongs(true);
            }
        }
    }

    useEffect(() => {
        fetchAllSongs();
    }, []);

    if (noSongs) {
        return (
            <main>
                <h2>No Songs to display 😶</h2>
            </main>
        )
    } else {
        const allSongs = songs.map((currentSong, index) => {
            return <Song songData={currentSong} key={currentSong._id} />
        });
        return (
            <>
                <main>
                    <div className="mainSongContainer">
                        {/* List of songs */}
                        <div className="songListMainContainer">

                            <div className="songListContainer">
                                {/* Dynamically generated */}
                                {allSongs}
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}