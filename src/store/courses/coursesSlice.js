import { createSlice } from '@reduxjs/toolkit';
import { removeCourseById } from './thunks';

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: {
		isSaving: true,
		courses: [],
		course: null,
		// title, description, creationDate, id, duration, authors
	},
	reducers: {
		getAllCourses: (state, { payload }) => {
			state.courses = [...payload];
		},
		addNewEmptyCourse: (state, { payload }) => {
			state.courses.push(payload);
		},
		// setCourses: (state, { payload }) => {
		// 	console.log(payload);
		// 	state.courses = state.courses.concat(payload);
		// },
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

		addExampleOfCourse: (state, { payload }) => {
			if (!state.courses) {
				state.courses = getAllCourses();
			}
			if (state.courses) {
				state.courses = [...state.courses, payload];
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewEmptyCourse,
	setCourses,
	updateCourse,
	deleteCourseById,
	getAllCourses,
	addExampleOfCourse,
} = coursesSlice.actions;
