import { login, logout } from './userSlice';
import { logoutMethod, postDataLogin } from '../../helpers/providers';

export const startLoginWithEmailPassword = (email, password) => {
	return async (dispatch) => {
		const result = await postDataLogin(email, password);
		// console.log('hola', result);
		// console.log(result.errorMessage);
		// // console.log(result.ok);
		if (!result.isAuth) return await dispatch(logout());

		dispatch(login(result));
	};
};

export const userLogout = (token) => {
	return async (dispatch) => {
		const result = await logoutMethod(token);
		console.log(result);
		dispatch(logout(result));
		// try {
		// } catch (err) {
		// 	console.log(err);
		// }
	};
};

// CheckRoleUser
// export const roleUser = (token) => {
// 	return async (dispatch) => {
// 		try {
// 			const result = await getRole(token);
// 			dispatch(checkRole(result));
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// };

// export const startCreatingUserWithEmailPassword = (name, password, email) => {
// 	return async (dispatch) => {
// 		dispatch(checkingCredentials());
// 		const resp = await postDataRegistration(name, password, email);
// 		console.log(resp);
// 		console.log(resp.errorMessage);
// 		if (!resp.ok) return dispatch(logout());

// 		dispatch(login(resp));
// 	};
// };
