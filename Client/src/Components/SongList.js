import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router';
import axios from 'axios';

export default function SongList() {

    const location = useLocation();
    const [songData, setSongData] = React.useState("");

    const fetchSongs = async () => {
        const baseUrl = `http://localhost:4000/getFilteredSongs/${location.state}`;
        let response;
        try {
            response = await axios.get(baseUrl);
        } catch (err) {
            alert(err);
        }

        //     console.log(response)

        if (response.data.serverResponse.responseCode === 200) {
            setSongData(response.data.serverResponse.responseData);
            console.log(songData);
        } else {
            alert(`ERROR : ${response.data.serverResponse.message}`);
        }
    }

    React.useEffect(() => {
        fetchSongs();
    }, []);

    if (songData) {
        const data = songData.map((currData, index) => <ListItem>
            <ListItemAvatar key={index}>
                <Avatar>
                    <img src={currData.song_image} alt={currData.sung_by.artist_name} width="100%" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={currData.song_name} secondary={currData.sung_by.artist_name} />
        </ListItem>)

        return (
            <main>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {data}
                </List>
            </main>
        );
    } else {
        return (
            <h2>Error</h2>
        )
    }
}
