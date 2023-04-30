import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false,
		name: '',
		email: '',
		// token: '',
		// name: localStorage.getItem('name') || '',
		// email: localStorage.getItem('email') || '',
		token: localStorage.getItem('token') || '',
		role: '',
		message: '',
	},
	reducers: {
		login: (state, { payload }) => {
			state.isAuth = true;
			state.name = payload.name;
			state.email = payload.email;
			state.token = payload.token;
			state.role = payload.role;
			localStorage.setItem('role', payload.role);
			// localStorage.setItem('name', payload.name);
			// localStorage.setItem('email', payload.email);
			localStorage.setItem('token', payload.token);
		},
		// el payload, podría ser opcional
		logout: (state, { payload }) => {
			state.isAuth = payload;
			state.name = '';
			state.email = '';
			// state.token = '';
			// localStorage.removeItem('name');
			// localStorage.removeItem('email');
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			state.token = '';
			state.role = '';
			state.message = '';
		},
		// checkRole: (state, { payload }) => {
		// 	if (payload) {
		// 		state.role = payload;
		// 		localStorage.setItem('role', payload);
		// 	}
		// },
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, checkRole } = userSlice.actions;
