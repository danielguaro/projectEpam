import './logo.css';

import book_logo from '../../../assets/bookLogo.png';

export const Logo = () => {
	return (
		<>
			<picture className='logoPic'>
				<img src={book_logo} alt='Book_logo' />
			</picture>
		</>
	);
};
