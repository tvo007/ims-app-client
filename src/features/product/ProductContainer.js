import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {HTTP_STATUS} from '../../app/constants';
import {
  fetchProducts,
  selectLoadingStatus as selectProductStatus,
} from './productSlice';
import ProductsTable from './ProductsTable';
import BeatLoader from 'react-spinners/BeatLoader';

const useStyles = makeStyles (theme => ({
  root: {
    height: '100vh',
  },
}));

export default function ProductContainer () {
  const dispatch = useDispatch ();

  const productLoaded = useSelector (selectProductStatus);

  const products = useSelector (state => state.product.products);
  const loadingError = useSelector (state => state.product.error);

  useEffect (() => {
    dispatch (fetchProducts ());
    
  }, []);

  const color = '#5048E5';

  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Grid className={classes.root}>

      {productLoaded === HTTP_STATUS.PENDING &&
        
        <BeatLoader color={color} size={15} />}

      {productLoaded === HTTP_STATUS.FULFILLED &&
       
        <ProductsTable products={products} />}

      {loadingError &&
        <Typography variant="h4">{loadingError.message}</Typography>}
    </Grid>
  );
}

// const ProductsTable = ({products}) => {
//   return (
//     <div>
//       {products.data.map (product => (
//         <div key={product.id}>{product.attributes.category.data.attributes.name}</div>
//       ))}
//     </div>
//   );
// };
