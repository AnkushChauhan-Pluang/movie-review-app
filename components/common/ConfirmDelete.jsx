import { useUI } from '@components/ui/uiContext';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';

const ConfirmDelete = () => {
  const {
    state: { deleteRoute, idToDelete },
    dispatch,
  } = useUI();
  const { loginState } = useAuthContext();
  const router = useRouter();

  const handleDelete = () => {
    console.log('delete => ', deleteRoute, idToDelete);
    axios
      .delete(`/api/${deleteRoute}/${idToDelete}`, {
        headers: { Authorization: `Bearer ${loginState.token}` },
      })
      .then(() => {
        dispatch({ type: 'OPEN_TOAST', text: 'Deleted' });
        dispatch({ type: 'CLOSE_MODAL' });
        router.replace(router.asPath);
      })
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: message, variant: 'error' });
        dispatch({ type: 'CLOSE_MODAL' });
        router.replace(router.asPath);
      });
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-title">{'Confirm to delete'}</DialogTitle>
      <DialogActions>
        <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </div>
  );
};

export default ConfirmDelete;
