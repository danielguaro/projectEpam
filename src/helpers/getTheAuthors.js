import { theAuthors } from './selectors';
import { useSelector } from 'react-redux';

export const getTheAuthors = (courseAuthor) => {
	const allAuthors = useSelector(theAuthors).authors;
	const authorsNames = allAuthors
		.filter((author) => courseAuthor.includes(author.id))
		.map((author) => author.name);
	let authors = authorsNames.join(', ');
	return authors;
};
