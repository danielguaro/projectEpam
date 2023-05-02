import { login, logout } from './userSlice';
import { postDataLogin, logoutMethod } from './functions';

export const startLoginWithEmailPassword = (email, password) => {
	return async (dispatch) => {
		try {
			const result = await postDataLogin(email, password);
			if (!result.isAuth) return await dispatch(logout());

			dispatch(login(result));
		} catch (err) {
			console.error(err);
		}
	};
};

export const userLogout = (token) => {
	return async (dispatch) => {
		try {
			const result = await logoutMethod(token);
			dispatch(logout(result));
		} catch (err) {
			console.log(err);
		}
	};
};
