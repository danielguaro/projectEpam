import './button.css';

export const Button = ({ buttonText, onClick }) => {
	return (
		<>
			<button onClick={onClick}>{buttonText}</button>
		</>
	);
};
