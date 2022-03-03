import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useUI } from './uiContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
  const {
    state: { displayToast, text, variant },
    dispatch,
  } = useUI();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch({ type: 'CLOSE_TOAST' });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={displayToast}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
