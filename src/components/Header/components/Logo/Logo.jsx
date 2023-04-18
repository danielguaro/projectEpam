import './logo.css';

import dog_logo from '../../../assets/dog_logo.png';

export const Logo = () => {
	return (
		<>
			<picture className='logoPic'>
				<img src={dog_logo} alt='Dog Logo' />
			</picture>
		</>
	);
};
