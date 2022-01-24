import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import {useMediaQuery, useTheme} from '@mui/material';

const pages = [
  {name: 'Products', url: '/products'},
  {name: 'Create Products', url: '/products/create'},
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState (null);
  const [anchorElUser, setAnchorElUser] = React.useState (null);

  const handleOpenNavMenu = event => {
    setAnchorElNav (event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser (event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav (null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser (null);
  };

  const theme = useTheme ();

  const matchesMd = useMediaQuery (theme.breakpoints.up ('md'));

  return (
    <AppBar position="static" sx={{backgroundColor: '#fff', pr: '3.5rem'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {matchesMd
            ? <Button
                variant="text"
                disableElevation
                component={Link}
                to={'/products'}
              >
                <Typography variant="h6" noWrap sx={{color: 'black'}}>
                  IMS
                </Typography>
              </Button>
            : null}

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              open={Boolean (anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map (page => (
                <MenuItem
                  component={Link}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  to={page.url}
                >
                  <Typography
                    component={Box}
                    textAlign="center"
                    fontWeight={600}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
          >
            IMS
          </Typography> */}
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map (page => (
              <Button
                component={Link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{color: 'black', display: 'block'}}
                to={page.url}
              >
                <Typography component={Box} variant="body2" fontWeight={600}>
                  {page.name}
                </Typography>

              </Button>
            ))}
          </Box>

          {/* <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
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
              open={Boolean (anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map (setting => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
