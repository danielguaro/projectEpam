import { Route, Routes } from 'react-router-dom';

import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';

export const AuthRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
			</Routes>
		</>
	);
};
