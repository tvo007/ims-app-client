import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {HTTP_STATUS} from '../../app/constants';
import ProductForm from './ProductForm';
import {
  fetchReferences,
  selectLoadingStatus,
} from '../references/referenceSlice';
import { BeatLoader } from 'react-spinners';

const useStyles = makeStyles (theme => ({
  root: {
    height: '100vh',
  },
}));

export default function AddProductsContainer () {
  const dispatch = useDispatch ();

  const isLoaded = useSelector (selectLoadingStatus);
  const references = useSelector (state => state.reference.references);
  const loadingError = useSelector (state => state.reference.error);

  useEffect (() => {
    dispatch (fetchReferences ());
  }, []);

  const color = '#5048E5';

  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Grid className={classes.root}>

      {isLoaded === HTTP_STATUS.PENDING && <BeatLoader color={color} size={20} />}
      {isLoaded === HTTP_STATUS.FULFILLED &&
        <ProductForm references={references} />}

      {loadingError && <Typography variant='h4'>{loadingError.message}</Typography>}
    </Grid>
  );
}
