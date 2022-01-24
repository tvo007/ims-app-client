import {Button, Snackbar, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from './alertSlice';
import {resetAddProductStatus} from '../product/productSlice';

const Alert = () => {
  const dispatch = useDispatch ();
  const {alert} = useSelector (state => state.alert);
  const [message, setMessage] = useState ({type: '', message: ''});
  const [show, setShow] = useState (false);

  useEffect (
    () => {
      if (alert) {
        setMessage (message);
        setShow (true);
        setTimeout (() => {
          setShow (false);
          dispatch (resetAddProductStatus ());
          //incorporate a passable function to reset form status
        }, 3000);
      }
    },
    [alert, message]
  );

  const onClose = () => {
    setShow (false);
  };

  return show
    ? <Snackbar
        open={show}
        autoHideDuration={10000}
        onClose={onClose}
        message={alert.message || ''}
      />
    : null;
};

export default Alert;
