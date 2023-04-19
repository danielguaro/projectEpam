import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const getTheAuthors = (courseAuthor) => {
	const { initAuthors } = useContext(UserContext);
	let allAuthors = initAuthors();
	const authorsNames = allAuthors
		.filter((author) => courseAuthor.includes(author.id))
		.map((author) => author.name);
	let authors = authorsNames.join(', ');
	return authors;
};
