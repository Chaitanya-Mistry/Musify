import * as React from 'react';
import Grid from '@mui/material/Grid';
import { PlaylistCard } from './PlaylistCard';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 700,
            lg: 900,
            xl: 1200,
        },
    }
});

export const GridLayout = ({ list }) => {
    return (
        <ThemeProvider theme={theme}>
            <Grid paddingX={{ xs: 7 }} container spacing={{ xs: 2, sm: 2, md: 3, lg: 3 }} columns={{ xs: 2, sm: 6, md: 12, lg: 16, xl: 20 }} >
                {list.map((obj, key) => (
                    <Grid key={key} item xs={2} sm={3} md={4} lg={4} xl={4}>
                        <PlaylistCard obj={obj}></PlaylistCard>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>

    );
}
