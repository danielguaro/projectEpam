import { login, logout } from './userSlice';
import { logoutMethod, postDataLogin } from './userUtils';

export const startLoginWithEmailPassword = (email, password) => {
	return async (dispatch) => {
		try {
			const result = await postDataLogin(email, password);
			if (!result.isAuth) return await dispatch(logout());

			dispatch(login(result));
		} catch (err) {
			console.log(err);
		}
	};
};

export const userLogout = (token) => {
	return async (dispatch) => {
		try {
			const result = await logoutMethod(token);
			dispatch(logout(result));
		} catch {
			alert('Sorry, there is an error withe the server, try later');
		}
	};
};
