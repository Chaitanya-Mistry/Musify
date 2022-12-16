import axios from "axios";
import { useEffect, useState } from "react";
import SongList from "./SongList";

export const MyFavSongs = () => {

    const [favSongs, setFavSongs] = useState();
    const fetchFavSongs = async () => {
        let response;
        const baseURL = "http://localhost:4000/myFavouriteSongs";
        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            alert(err);
        }

        if (response.data.serverResponse.responseCode === 200) {
            setFavSongs(response.data.serverResponse.responseData);
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }

    useEffect(() => {
        fetchFavSongs();
    }, []);

    if (favSongs) {
        return (
            <SongList favSongs={favSongs} />
        )
    }

}