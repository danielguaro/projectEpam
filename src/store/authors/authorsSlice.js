import { createSlice } from '@reduxjs/toolkit';

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: {
		isSaving: true,
		authors: [],
		author: null, // {name, id}
	},
	reducers: {
		updateAuthor: (state, action) => {},
		deleteAuthorById: (state, action) => {},
		getAllAuthors: (state, { payload }) => {
			state.authors = [...payload];
		},
		addNewEmptyAuthor: (state, { payload }) => {
			state.authors = [...state.authors, payload];
			// console.log(payload);
			// console.log(state.authors, 'state.authors');
			// if (!state.authors) {
			// 	state.authors = getAllAuthors();
			// 	console.log(state.authors, 'state.authors');
			// }
			// if (state.authors) {
			// 	console.log('entre al if!!!');
			// 	console.log('entre al if!!!----------->', state.authors);
			// 	state.authors = [...state.authors, payload];
			// 	console.log('ANTES DE SALIR!!!----------->', state.authors);
			// }
		},
		addExampleOfAuthor: (state, { payload }) => {
			if (!state.authors) {
				state.authors = getAllAuthors();
			}
			if (state.authors) {
				state.authors = [...state.authors, payload];
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewEmptyAuthor,
	updateAuthor,
	deleteAuthorById,
	getAllAuthors,
	addExampleOfAuthor,
} = authorsSlice.actions;
