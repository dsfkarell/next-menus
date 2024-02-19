import { createSlice } from '@reduxjs/toolkit';

const snackSlice = createSlice({
	name: 'snack',
	initialState: { show: false, message: '', type: '', duration: 5000 },
	reducers: {
		showSnackbar: (state, action) => {
			state.show = true;
			state.message = action.payload.message || '';
			state.type = action.payload.type || 'success';
			state.duration = action.payload.duration || 5000;
		},
		hideSnackbar: (state) => {
			state.show = false;
		},
	},
});

export const snackReducer = snackSlice.reducer;

export const {
	showSnackbar, hideSnackbar,
} = snackSlice.actions;