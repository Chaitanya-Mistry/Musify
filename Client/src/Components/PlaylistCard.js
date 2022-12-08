import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const  PlaylistCard = ({obj}) => {
    return (
        <Card sx={{ width: 230 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="280"
                    image={obj.image}
                    alt={obj.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
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