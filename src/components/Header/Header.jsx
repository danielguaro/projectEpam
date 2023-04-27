import './header.css';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { logout } from '../../store/user';
import { theUser } from '../../helpers/selectors';

export const Header = () => {
	// dispatch
	const dispatch = useDispatch();
	const name = useSelector(theUser).name;

	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<header>
			<Link to={'/courses'}>
				<Logo />
			</Link>
			<div className='headerContact'>
				{name && <h3>{name}</h3>}
				<Button buttonText={'Logout'} onClick={onLogout} />
			</div>
		</header>
	);
};
