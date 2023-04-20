import './header.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { UserContext } from '../../context/UserContext';

export const Header = () => {
	const navigate = useNavigate();
	// const { user } = useContext(UserContext);
	// console.log('user', user.name);
	const name = localStorage.getItem('name');
	console.log(name);

	const onLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		// Para evitar que la persona vuelva a la pestaña anterior como si nada utilizo el objeto replace: true
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
