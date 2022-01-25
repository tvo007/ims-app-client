import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

//create a custom hook that can
//call alerts
//cancel reset form statuses with passable functions
//useSelector
//step 1: convert logic in Alert component into a useHook
//step 2: reuse the hook in Alert component
//step 3: include parameters for alert message and resetFormStatus??
//refere to Alert component and ProductForm component

export const useAlert = () => {
  const dispatch = useDispatch ();
  const {alert} = useSelector (state => state.alert);
  const [message, setMessage] = useState ({type: '', message: ''});
  const [show, setShow] = useState (false);

  // const alertHandler = useCallback(() => {
  //   resetAction?.()
  // }, []) 

  useEffect (
    () => {
      let isAlerting = true
      if (alert) {
        setMessage (message);
        setShow (true);
        setTimeout (() => {
          setShow (false);
        }, 3000);
      }

      return () => isAlerting = false
    },
    [alert, message,]
  );

  const onClose = () => {
    setShow (false);
  };
  
  return {alert, message, show, onClose};
};
