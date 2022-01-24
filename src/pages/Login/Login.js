import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles (theme => ({
  root: {
    marginTop: '10rem'
  },
}));

const Login = () => {
  const theme = useTheme ();
  const classes = useStyles ();

  return <div className={classes.root}>This is the login</div>;
};

export default Login;
