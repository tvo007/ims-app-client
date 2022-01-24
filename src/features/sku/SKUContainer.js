import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {HTTP_STATUS} from '../../app/constants';
import {fetchSkus, selectLoadingStatus} from './skuSlice';

const useStyles = makeStyles (theme => ({
  root: {},
}));

export default function SKUContainer () {
  const dispatch = useDispatch ();

  const isLoaded = useSelector (selectLoadingStatus);
  const skus = useSelector (state => state.sku.skus);

  useEffect (() => {
    dispatch (fetchSkus ());
  }, []);

  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Grid className={classes.root}>

      <SKUForm />

      {isLoaded === HTTP_STATUS.FULFILLED && <SKUTable skus={skus} />}
    </Grid>
  );
}

const SKUForm = () => {
  return <div>This is the sku form</div>;
};

const SKUTable = ({skus}) => {
  return (
    <div>
      {skus.data.map (sku => <div key={sku.id}>{sku.attributes.code}</div>)}
    </div>
  );
};
