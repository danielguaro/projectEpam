import './header.css';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	console.log('user', user.name);

	const onLogout = () => {
		localStorage.removeItem('token');
		// Para evitar que la persona vuelva a la pestaña anterior como si nada utilizo el objeto replace: true
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<header>
			<Logo />
			<div className='headerContact'>
				<h3>{user?.name}</h3>
				<Button buttonText={'Logout'} onClick={onLogout} />
			</div>
		</header>
	);
};
