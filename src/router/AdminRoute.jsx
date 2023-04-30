import { Navigate } from 'react-router-dom';
import { theUser } from '../helpers/selectors';
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
	const role = useSelector(theUser).role;
	console.log(role);

	// return token ? children : <Navigate to='/login' />;
	return role === 'admin' ? children : <Navigate to='/courses' />;
};
