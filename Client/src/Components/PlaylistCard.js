import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router';

export const PlaylistCard = ({ obj }) => {
    const navigate = useNavigate();

    const showPlaylist = (genre) => {
        navigate("/playList", { state: genre });    
    }

    return (
        <Card sx={{ width: 230 }}
        onClick={() => showPlaylist(obj.title)}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="280"
                    image={obj.image}
                    alt={obj.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >
                        {obj.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {obj.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}