import React from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import Navbar from './Navbar';
import {Container} from '@mui/material';
import {Outlet} from 'react-router-dom';

const useStyles = makeStyles (theme => ({
  root: {
    marginTop: '5rem',
  },
}));

const Layout = () => {
  const theme = useTheme ();
  const classes = useStyles ();
  return (
    <div>
      <Navbar />
      <Container className={classes.root}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
