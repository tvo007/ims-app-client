import React from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid} from '@mui/material';
import AddProductsContainer from '../../features/product/AddProductsContainer'

const useStyles = makeStyles (theme => ({
  root: {},
}));

const Products = () => {
  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Grid className={classes.root}>
      <AddProductsContainer />
    </Grid>
  );
};

export default Products;
