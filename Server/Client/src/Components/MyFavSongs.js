import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SongList from "./SongList";
import { UserLoginContext } from '../App';

export const MyFavSongs = () => {

    const [favSongs, setFavSongs] = useState();
    const { serverEndPoint } = useContext(UserLoginContext);

    const fetchFavSongs = async () => {
        let response;
        const baseURL = `${serverEndPoint}/myFavouriteSongs`;
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