
import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles (theme => ({
  root: {},
}));

const Dash = () => {
  const theme = useTheme ();
  const classes = useStyles ();

  return <div className={classes.root}>Dash</div>;
};

export default Dash;