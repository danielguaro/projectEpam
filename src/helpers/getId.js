export const getId = () => {
	const optionValues = '0123456789abcdef';
	let id = '';

	// Generate a random 32 character hexadecimal string
	for (let i = 0; i < 32; i++) {
		const randomIndex = Math.floor(Math.random() * optionValues.length);
		const randomChar = optionValues[randomIndex];
		id += randomChar;
	}

	// Add hyphens to match the example format
	id = `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
		16,
		20
	)}-${id.slice(20)}`;

	return id;
};
