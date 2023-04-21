import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Courses } from './components/Courses/Courses';
import { CoursesRoutes } from './components/routes/CoursesRoutes';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/publicRoute';
import { Registration } from './components/Registration/Registration';
import { UserProvider } from './context/UserProvider';

export const App = () => {
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
				{/* <Routes>
						<Route path='login' element={<Login />} />
						<Route path='registration' element={<Registration />} />
					</Routes> */}

				<Route
					path='/*'
					element={
						<PrivateRoute>
							<CoursesRoutes />
						</PrivateRoute>
					}
				/>
				{/* <Route path='/*' element={<CoursesRoutes />} /> */}
			</Routes>
		</UserProvider>
	);
};
