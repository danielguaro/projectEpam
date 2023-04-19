import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Courses } from './components/Courses/Courses';
import { CoursesRoutes } from './components/routes/CoursesRoutes';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { UserProvider } from './context/UserProvider';

export const App = () => {
	return (
		<UserProvider>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='/*' element={<CoursesRoutes />} />
			</Routes>
		</UserProvider>
	);
};
