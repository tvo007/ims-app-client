import React from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {Grid, Typography} from '@mui/material';
import ProductContainer from '../../features/product/ProductContainer';
import {styled} from '@mui/material/styles';

const useStyles = makeStyles (theme => ({
  root: {},
}));

const PageHeader = ({title}) => {
  const theme = useTheme ();
  const classes = useStyles ();

  return (
    <Typography variant="h4">
      <strong>{title}</strong>
    </Typography>
  );
};

export default PageHeader;
