import './header.css';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

export const Header = () => {
	return (
		<header>
			<Logo />
			<div className='headerContact'>
				<h3>Daniel</h3>
				<Button buttonText={'Logout'} />
			</div>
		</header>
	);
};
