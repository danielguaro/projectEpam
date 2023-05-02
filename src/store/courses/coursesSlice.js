import { createSlice } from '@reduxjs/toolkit';

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		isSaving: true,
		courses: [],
		course: null,
	},
	reducers: {
		getAllCourses: (state, { payload }) => {
			state.courses = [...payload];
		},
		addNewEmptyCourse: (state, { payload }) => {
			state.courses.push(payload);
		},
		updateCourse: (state, { payload }) => {
			const updatedCourse = payload;
			const index = state.courses.findIndex(
				(course) => course.id === updatedCourse.id
			);
			if (index !== -1) {
				state.courses[index] = updatedCourse;
			}
		},
		deleteCourseById: (state, { payload }) => {
			state.courses = state.courses.filter((course) => course.id !== payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewEmptyCourse,
	updateCourse,
	deleteCourseById,
	getAllCourses,
} = coursesSlice.actions;
