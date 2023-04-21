import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
	// useContext(UserContext)
	const token = localStorage.getItem('token');

	return token ? children : <Navigate to='/login' />;
};
