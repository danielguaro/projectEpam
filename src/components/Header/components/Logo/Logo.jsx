import './logo.css';

export const Logo = ({ src }) => {
	return (
		<>
			<div className='logoPic'>
				<img src={src} alt='Book_logo' data-testid='logo-img' />
			</div>
		</>
	);
};
