import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalIsOpen: false,
  activeModal: '',
  modalCoordinates: {
    x: 0,
    y: 0,
  },
}

export const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalIsOpen = !state.modalIsOpen;
      state.modalCoordinates = action.payload.coordinates;
      state.activeModal = action.payload.activeModal;
    },
  },
});

export const { toggleModal } = utilitySlice.actions;
export default utilitySlice.reducer;