import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
	const token = localStorage.getItem('token');

	return !token ? children : <Navigate to='/courses' />;
};
