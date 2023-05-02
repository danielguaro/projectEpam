import { addNewEmptyAuthor, getAllAuthors } from './authorsSlice';
import { createNewAuthor, getAuthors } from './functions';

export const showAllAuthors = () => {
	return async (dispatch) => {
		try {
			const result = await getAuthors();
			dispatch(getAllAuthors(result));
		} catch (err) {
			console.log(err);
		}
	};
};

export const addNewAuthor = (authorName, token) => {
	return async (dispatch) => {
		try {
			const result = await createNewAuthor(authorName, token);
			dispatch(addNewEmptyAuthor(result));
		} catch (err) {
			console.log(err);
		}
	};
};
