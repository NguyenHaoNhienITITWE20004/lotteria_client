import { createSlice } from '@reduxjs/toolkit';

import { ModalTypes } from '../../constant/modal';

const initialState = {
  modals: {
    [ModalTypes.SIGN_IN]: {
      isOpen: false,
      content: null,
    },
    [ModalTypes.SIGN_UP]: {
      isOpen: false,
      content: null,
    },
    [ModalTypes.USER]: {
      isOpen: false,
      content: null,
    },
    [ModalTypes.PRODUCT]: {
      isOpen: false,
      content: null,
    },
    [ModalTypes.CATEGORY]: {
      isOpen: false,
      content: null,
    },
    [ModalTypes.ORDER]: {
      isOpen: false,
      content: null,
    },
    [ModalTypes.DISCOUNT]: {
      isOpen: false,
      content: null,
    },
  },
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { name, content } = action.payload;
      if (state.modals[name]) {
        state.modals[name] = { isOpen: true, content: content };
      }
    },
    closeModal: (state, action) => {
      const { name } = action.payload;
      if (state.modals[name]) {
        state.modals[name] = { isOpen: false, content: null };
      }
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
