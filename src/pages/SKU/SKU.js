import React from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid} from '@mui/material';
import SKUContainer from '../../features/sku/SKUContainer';

const useStyles = makeStyles (theme => ({
  root: {},
}));

const SKU = () => {
  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Grid className={classes.root}>
      <SKUContainer />
    </Grid>
  );
};

export default SKU;
