import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Divider } from '@mui/material';
import { Audio } from "./Audio";
import { useContext } from "react";
import { UserLoginContext } from "../App";

export default function SongList({favSongs}) {

    const location = useLocation();
    const [songData, setSongData] = React.useState("");
    const { serverEndPoint } = useContext(UserLoginContext);

    const fetchSongs = async () => {
        const baseUrl = `${serverEndPoint}/getFilteredSongs/${location.state}`;
        let response;
        try {
            response = await axios.get(baseUrl);
        } catch (err) {
            alert(err);
        }

        // console.log(response)

        if (response.data.serverResponse.responseCode === 200) {
            setSongData(response.data.serverResponse.responseData);
            console.log(songData);
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }

    const addToLike = async (songId) => {
        const baseUrl = `${serverEndPoint}/addMyFavSong/${songId}`;


        let response;
        try {
            response = await axios({
                url: baseUrl,
                method: "PATCH",
                withCredentials: true
            });
        } catch (err) {
            alert(err);
        }

        if (response.data.serverResponse.responseCode === 201) {
            alert("Song added to the favourite playlist");
            //console.log(songData);
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }

    }

    React.useEffect(() => {
        if(favSongs){
            setSongData(favSongs.favourite_songs);
            console.log("Wow",favSongs)
        }else{
            fetchSongs();
        }
    }, []);

    if (songData) {
        return (            
            <main>
                <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                    {
                        songData.map((currData, index) =>
                            <>
                                <ListItem>
                                    <ListItemAvatar key={index}>
                                        
                                        <Audio songData={currData} isPlayList={true}></Audio>
                                    </ListItemAvatar>
                                    <ListItemText primary={currData.song_name} secondary={currData.sung_by.artist_name} />
                                    <FavoriteIcon sx={{ margin: 3 }} onClick={() => addToLike(currData._id)} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    }
                </List>
            </main>
        );
    } else {
        return (
            <h2>Error</h2>
        )
    }
}
