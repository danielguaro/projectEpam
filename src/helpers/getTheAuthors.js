import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

export const getTheAuthors = (courseAuthor) => {
	// const { initAuthors } = useContext(UserContext);
	const theAuthors = useSelector((state) => state.authors.authorsState.authors);
	// let allAuthors = initAuthors();
	console.log(theAuthors);
	const authorsNames = theAuthors
		.filter((author) => courseAuthor.includes(author.id))
		.map((author) => author.name);
	let authors = authorsNames.join(', ');
	return authors;
};
