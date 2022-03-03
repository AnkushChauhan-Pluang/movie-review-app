import { createContext, useContext, useReducer } from 'react';

const initialState = {
  modalView: 'CONFIRM_DELETE',
  deleteRoute: '',
  idToDelete: '',
  displayModal: false,
  displayToast: false,
  text: '',
  variant: 'success',
};

export const UIContext = createContext();
UIContext.displayName = 'UIContext';

const UIReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        displayModal: true,
        modalView: action.view,
        deleteRoute: action.route,
        idToDelete: action.id
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        displayModal: false,
      };
    case 'OPEN_TOAST':
      return {
        ...state,
        displayToast: true,
        text: action.text,
        variant: action.variant,
      };
    case 'CLOSE_TOAST':
      return {
        ...state,
        displayToast: false,
      };
  }
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, initialState);

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
