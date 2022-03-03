import Dialog from '@mui/material/Dialog';
import { useUI } from './uiContext';

const Modal = ({ children }) => {
  const {
    state: { displayModal },
    dispatch,
  } = useUI();

  return (
    <Dialog
      open={displayModal}
      onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
