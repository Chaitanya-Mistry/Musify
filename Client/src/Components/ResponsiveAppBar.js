import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { UserLoginContext } from '../App';
import axios from 'axios';


const pages = [
    { name: 'login', link: 'login' },
    { name: 'Admin Login', link: 'loginAdmin' },
    { name: 'Sign Up', link: 'signUp' },
    { name: 'Dontae', link: 'donate' }
];
const userPages = [
    { name: 'My Favourite Songs', link: '/myFavSongs' },
    { name: 'Search Songs', link: '/serchSongs' },
    { name: 'My Account', link: '/myAccount' },
    { name: 'Dontae', link: 'donate' }
];
const adminPages = [
    { name: 'Manage Artist', link: '/manageArtist' },
    { name: 'Manage Song', link: '/manageSong' },
]

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const { isLoggedIn, setLogIn, isAdminLoggedIn, setAdminLogIn } = useContext(UserLoginContext);
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState("");

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav("");
    };
    // const [anchorElUser, setAnchorElUser] = useState("");
    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };
    // const handleCloseUserMenu = () => {
    //     setAnchorElUser("");
    // };


    // Logout functionality ..
    const allowUserToLogout = async (event) => {
        event.preventDefault();

        const baseURL = 'http://localhost:4000/logout'; // Our API server
        let response;

        try {
            response = await axios.get(baseURL, { withCredentials: true });
        } catch (err) {
            response = err.response;
        }

        if (response.status === 200) {
            setLogIn(false); // set user login status
            setAdminLogIn(false); // set admin login status
            navigate('/'); // Navigate to default home page after log out ..
        } else {
            alert('ERROR in logout ..', response);
        }
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Logo */}
                    <NavLink to='/'>
                        <Typography
                            variant="h1"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                            }}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/2829/2829076.png" alt="site logo" width="45" />

                        </Typography>
                    </NavLink>

                    {/* Menu Icon in mobile view */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>


                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {pages.map((page, key) => (
                                <MenuItem key={key} >
                                    <Typography textAlign="center"><NavLink to={page.link}>{page.name}</NavLink></Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo in mobile view */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                        }}
                    >
                        <NavLink to='/'>
                            <img src="https://cdn-icons-png.flaticon.com/512/2829/2829076.png" alt="site logo" width="45" />
                        </NavLink>
                    </Typography>

                    {/* menu in desktop view */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            isLoggedIn
                                ?
                                userPages.map((page, key) => (
                                    <NavLink key={key} to={page.link}>
                                        <Typography color='white' fontSize={18} margin={2} textAlign="center">
                                            {page.name}
                                        </Typography>
                                    </NavLink>
                                ))
                                :
                                isAdminLoggedIn
                                    ?
                                    adminPages.map((page, key) => (
                                        <NavLink key={key} to={page.link}>
                                            <Typography color='white' fontSize={18} margin={2} textAlign="center">
                                                {page.name}
                                            </Typography>
                                        </NavLink>
                                    ))
                                    :
                                    pages.map((page, key) => (
                                        <NavLink key={key} to={page.link}>
                                            <Typography color='white' fontSize={18} margin={2} textAlign="center">
                                                {page.name}
                                            </Typography>
                                        </NavLink>
                                    ))
                        }
                        {
                            isLoggedIn
                                ?
                                <NavLink to='' onClick={allowUserToLogout}>
                                    <Typography color='white' fontSize={18} textAlign="center">
                                        Logout
                                    </Typography>
                                </NavLink>
                                :
                                <></>
                        }
                    </Box>
                    {/* {pages.map((page, key) => (
                            <NavLink key={key} to={page.link}>
                                <Typography color='white' fontSize={18} margin={2}>
                                    {page.name}
                                </Typography>
                            </NavLink>
                        ))} */}

                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;