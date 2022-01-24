import React from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid} from '@mui/material';
import ProductContainer from '../../features/product/ProductContainer'

const useStyles = makeStyles (theme => ({
  root: {},
}));

const Products = () => {
  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Grid className={classes.root}>
      <ProductContainer />
    </Grid>
  );
};

export default Products;
