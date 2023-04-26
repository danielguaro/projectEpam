import './input.css';

export const Input = ({
	onSubmit,
	placeholder,
	value,
	onChange,
	name,
	inputClass,
	type = 'text',
	onKeyPress,
}) => {
	return (
		<>
			<form onSubmit={onSubmit}>
				<label>
					<input
						className={inputClass}
						type={type}
						name={name}
						placeholder={placeholder}
						autoComplete='off'
						value={value}
						onChange={onChange}
						onKeyPress={onKeyPress}
					/>
				</label>
			</form>
		</>
	);
};
