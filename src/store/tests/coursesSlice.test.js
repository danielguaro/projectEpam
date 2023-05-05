import { addNewEmptyCourse, coursesSlice, getAllCourses } from '../courses';
import {
	demoCourse,
	demoCourses,
	initialState,
} from './fixtures/coursesFixtures';

describe('Tests on the coursesSlice', () => {
	test('should return the initial state and be called "courses"', () => {
		// console.log(coursesSlice);
		expect(coursesSlice.name).toBe('courses');
		const state = coursesSlice.reducer(initialState, {}); //Second argument is an action
		// console.log(state);
		expect(state).toEqual(initialState);
	});

	test('should handle SAVE_COURSE and return new state', () => {
		// console.log(addNewEmptyCourse(demoCourse));
		const state = coursesSlice.reducer(
			initialState,
			addNewEmptyCourse(demoCourse)
		);
		// console.log(state);
		expect(state).toEqual({
			isSaving: true,
			courses: [
				{
					title: demoCourse.title,
					description: demoCourse.description,
					duration: demoCourse.duration,
					creationDate: demoCourse.creationDate,
					id: demoCourse.id,
					authors: demoCourse.authors,
				},
			],
			course: null,
		});
	});

	//
	test('should handle GET_COURSES and returns new state', () => {
		// console.log(addNewEmptyCourse(demoCourse));
		const state = coursesSlice.reducer(
			initialState,
			getAllCourses(demoCourses)
		);
		console.log(state);
		expect(state).toEqual({
			isSaving: true,
			courses: [...demoCourses],
			course: null,
		});
	});
});
