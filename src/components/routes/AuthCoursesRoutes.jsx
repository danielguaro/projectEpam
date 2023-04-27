import { Route, Routes } from 'react-router-dom';

import { CoursesRoutes } from './CoursesRoutes';
import { Login } from '../Login/Login';
import { PrivateRoute } from '../../router/PrivateRoute';
import { PublicRoute } from '../../router/publicRoute';
import { Registration } from '../Registration/Registration';
import { UserProvider } from '../../context/UserProvider';

export const AuthCoursesRoutes = () => {
	return (
		<UserProvider>
			<Routes>
				<Route
					path='/login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='/registration'
					element={
						<PublicRoute>
							<Registration />
						</PublicRoute>
					}
				/>
				<Route
					path='/*'
					element={
						<PrivateRoute>
							<CoursesRoutes />
						</PrivateRoute>
					}
				/>
			</Routes>
		</UserProvider>
	);
};
