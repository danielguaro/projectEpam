export const createCourseReducer = (initialState = [], action) => {
	switch (action.type) {
		case '[COURSE] add course':
			return [...initialState, action.payload];

		case '[COURSE] Remove course':
			return initialState.filter((todo) => todo.id !== action.payload);

		default:
			return initialState;
	}
};
