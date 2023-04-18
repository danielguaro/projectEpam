import './input.css';

export const Input = ({
	onSubmit,
	placeholder,
	value,
	onChange,
	name,
	inputclas,
	type = 'text',
}) => {
	return (
		<>
			<form onSubmit={onSubmit}>
				<label>
					<input
						className={inputclas}
						type={type}
						name={name}
						placeholder={placeholder}
						autoComplete='off'
						value={value}
						onChange={onChange}
					/>
				</label>
			</form>
		</>
	);
};
