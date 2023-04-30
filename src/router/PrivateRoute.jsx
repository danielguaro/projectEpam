import { Navigate } from 'react-router-dom';
import { theUser } from '../helpers/selectors';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
	// useContext(UserContext)
	const token = localStorage.getItem('token');
	const role = useSelector(theUser).role;
	console.log(role);

	// return token ? children : <Navigate to='/login' />;
	return token ? children : <Navigate to='/login' />;
};
