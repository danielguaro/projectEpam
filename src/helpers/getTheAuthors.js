import { theAuthors } from './selectors';
import { useSelector } from 'react-redux';

export const getTheAuthors = (courseAuthor) => {
	// const { initAuthors } = useContext(UserContext);
	// const theAuthors = useSelector((state) => state.authors.authorsState.authors);
	const allAuthors = useSelector(theAuthors).authors;
	// let allAuthors = initAuthors();
	const authorsNames = allAuthors
		.filter((author) => courseAuthor.includes(author.id))
		.map((author) => author.name);
	let authors = authorsNames.join(', ');
	return authors;
};
