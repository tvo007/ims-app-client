import {Snackbar} from '@mui/material';

import {useAlert} from '../../utils/useAlert';

const Alert = () => {
  const {alert, show, onClose} = useAlert ();
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
