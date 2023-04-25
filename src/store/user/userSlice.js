import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		status: 'not-authenticated', // 'checking','not-authenticated', 'authenticated'
		isAuth: false,
		name: '',
		email: '',
		// token: '',
		// name: localStorage.getItem('name') || '',
		// email: localStorage.getItem('email') || '',
		token: localStorage.getItem('token') || '',
		message: '',
	},
	reducers: {
		login: (state, { payload }) => {
			state.status = 'authenticated';
			state.isAuth = true;
			state.name = payload.name;
			state.email = payload.email;
			state.token = payload.token;
			// localStorage.setItem('name', payload.name);
			// localStorage.setItem('email', payload.email);
			localStorage.setItem('token', payload.token);
		},
		// el payload, podría ser opcional
		logout: (state) => {
			state.status = 'not-authenticated';
			state.isAuth = false;
			state.name = '';
			state.email = '';
			// state.token = '';
			// localStorage.removeItem('name');
			// localStorage.removeItem('email');
			// state.token = '';
			localStorage.removeItem('token');
			state.message = 'email or password invalid';
		},
		// Para evitar doblePosteo, mientras se corrobora si el usuairo esta ingresando
		checkingCredentials: (state) => {
			state.status = 'checking';
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = userSlice.actions;
