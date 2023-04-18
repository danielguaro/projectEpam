import './button.css';

export const Button = ({ buttonText, onClick }) => (
	<button onClick={onClick}>{buttonText}</button>
);
