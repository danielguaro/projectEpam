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

		logout: (state, { payload }) => {
			state.isAuth = payload.isAuth;
			state.name = payload.name;
			state.email = payload.email;
			// state.token = '';
			// localStorage.removeItem('name');
			// localStorage.removeItem('email');
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			state.token = payload.token;
			state.role = payload.role;
			state.message = payload.message;
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
