import {
	addNewEmptyAuthor,
	deleteAuthorById,
	getAllAuthors,
	updateAuthor,
} from './authorsSlice';
import { createNewAuthor, getAuthors } from '../../helpers/providers';

export const showAllAuthors = () => {
	return async (dispatch) => {
		const result = await getAuthors();
		// console.log('-*-*-*-*', result);
		dispatch(getAllAuthors(result));
	};
};

export const addNewAuthor = (authorName, token) => {
	return async (dispatch) => {
		const result = await createNewAuthor(authorName, token);
		console.log(result);

		dispatch(addNewEmptyAuthor(result));
	};
};
