import { createNewAuthor, getAuthors } from '../../helpers/providers';
import {
	addNewEmptyAuthor,
	updateAuthor,
	deleteAuthorById,
	getAllAuthors,
} from './authorsSlice';

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
