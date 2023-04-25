import './button.css';

export const Button = ({ buttonText, onClick, className }) => (
	<button onClick={onClick} className={className}>
		{buttonText}
	</button>
);
