// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { PlaylistCard } from './PlaylistCard';

// export const StackLayout = ({ list }) => {
//     return (
//         <Box sx={{ flexGrow: 0 }}>
//             <Grid container spacing={2}>
//                 {list.map((obj, key) => (
//                     <Grid item xs={8} md={3}>
//                         <PlaylistCard obj = {obj}></PlaylistCard>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }


import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { PlaylistCard } from './PlaylistCard';


export const StackLayout = ({ list }) => {
    return (
        <div>
            <Stack
                sx = {{
                    // display: 'flex',
                    // flexDirection: 'column'                    
                }}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {list.map((obj, key) => (
                        <PlaylistCard obj = {obj}></PlaylistCard>
                ))}
            </Stack>
        </div>
    );
}
