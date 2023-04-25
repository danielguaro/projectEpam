import { createSlice } from '@reduxjs/toolkit';

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: {
		isSaving: true,
		authors: [],
		author: null, // {name, id}
	},
	reducers: {
		addNewEmptyAuthor: (state, { payload }) => {
			state.authors.push(payload);
		},
		updateAuthor: (state, action) => {},
		deleteAuthorById: (state, action) => {},
		getAllAuthors: (state, { payload }) => {
			state.authors = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewEmptyAuthor,
	updateAuthor,
	deleteAuthorById,
	getAllAuthors,
} = authorsSlice.actions;
