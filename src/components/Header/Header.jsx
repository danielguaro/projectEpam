import './header.css';

import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { theUser } from '../../helpers/selectors';

export const Header = () => {
	// dispatch
	const dispatch = useDispatch();
	const name = useSelector(theUser).name;
	const token = useSelector(theUser).token;

	const navigate = useNavigate();

	const leave = () => {
		navigate('/login', {
			replace: true,
		});
	};

	const onLogout = () => {
		dispatch(userLogout(token));
		setTimeout(() => leave(), [100]);
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
