import { addNewEmptyAuthor, getAllAuthors } from './authorsSlice';
import { createNewAuthor, getAuthors } from './authorsUtils';

export const showAllAuthors = () => {
	return async (dispatch) => {
		try {
			const result = await getAuthors();
			dispatch(getAllAuthors(result));
		} catch {
			alert('Sorry, there is an error withe the server, try later');
		}
	};
};

export const addNewAuthor = (authorName, token) => {
	return async (dispatch) => {
		try {
			const result = await createNewAuthor(authorName, token);
			dispatch(addNewEmptyAuthor(result));
		} catch {
			alert('Sorry, there is an error withe the server, try later');
		}
	};
};
