import { checkingCredentials, login, logout } from './userSlice';

import { postDataLogin } from '../../helpers/providers';

export const startLoginWithEmailPassword = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const result = await postDataLogin(email, password);
		// console.log('hola', result);
		// console.log(result.errorMessage);
		// // console.log(result.ok);
		if (!result.isAuth) return await dispatch(logout());

		dispatch(login(result));
	};
};

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
