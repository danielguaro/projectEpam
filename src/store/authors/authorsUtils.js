// Get all authors
export const getAuthors = async () => {
	const response = await fetch('http://localhost:4000/authors/all');
	const data = await response.json();

	if (data.successful === false) {
		return {
			authors: [],
		};
	}
	return data.result;
};

// Create new author
export const createNewAuthor = async (authorName, token) => {
	const newAuthor = { name: authorName };
	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(newAuthor),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});
	const result = await response.json();
	const { name } = result.result;
	return {
		name,
	};
};
