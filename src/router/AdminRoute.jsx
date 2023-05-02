import { Navigate } from 'react-router-dom';
import { theUser } from '../helpers/selectors';
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
	const role = useSelector(theUser).role;

	return role === 'admin' ? children : <Navigate to='/courses' />;
};
