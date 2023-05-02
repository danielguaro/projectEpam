import { createSlice } from '@reduxjs/toolkit';

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: {
		isSaving: true,
		authors: [],
		author: null, // {name, id}
	},
	reducers: {
		getAllAuthors: (state, { payload }) => {
			state.authors = [...payload];
		},
		addNewEmptyAuthor: (state, { payload }) => {
			state.authors = [...state.authors, payload];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNewEmptyAuthor, getAllAuthors } = authorsSlice.actions;
