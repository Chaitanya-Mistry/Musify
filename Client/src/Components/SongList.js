import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
// import { useLocation } from 'react-router';
// import axios from 'axios';

export default function SongList({ obj }) {

    // const location = useLocation();
    // const [songData, setSongData] = React.useState("");

    // const fetchSongs = async () => {
    //     const baseUrl = `http://localhost:4000/getFilteredSongs/${location.state}`;
    //     let response;
    //     try {
    //         // response = await axios.get(baseUrl);
    //         response = await fetch(baseUrl);

    //     } catch (err) {
    //         alert(err);
    //     }

    //     console.log(response)

    //     // if (response.data.serverResponse.responseCode === 200) {
    //     //     setSongData(response.data.serverResponse.responseData);
    //     // } else {
    //     //     alert(`ERROR : ${response.data.serverResponse.message}`);
    //     // }
    // }

    // React.useEffect(() => {
    //     fetchSongs();
    // }, []);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* {obj.img} */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={obj.name} secondary={obj.artist} /> */}
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
        </List>
    );
}
