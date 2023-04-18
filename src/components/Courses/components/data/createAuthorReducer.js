export const createAuthorReducer = (initialState = [], action) => {
	switch (action.type) {
		case '[AUTHOR] add author':
			return [...initialState, action.payload];

		default:
			return initialState;
	}
};
