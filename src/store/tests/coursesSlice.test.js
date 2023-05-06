import { addNewEmptyCourse, coursesSlice, getAllCourses } from '../courses';
import {
	demoCourse,
	demoCourses,
	initialState,
} from './fixtures/coursesFixtures';

describe('Tests on the coursesSlice (Reducer)', () => {
	test('should return the initial state and be called "courses"', () => {
		expect(coursesSlice.name).toBe('courses');
		const state = coursesSlice.reducer(initialState, {}); //Second argument is an action
		expect(state).toEqual(initialState);
	});

	test('should save a course and return new state', () => {
		const state = coursesSlice.reducer(
			initialState,
			addNewEmptyCourse(demoCourse)
		);
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
	test('should get all courses and returns new state', () => {
		const state = coursesSlice.reducer(
			initialState,
			getAllCourses(demoCourses)
		);
		expect(state).toEqual({
			isSaving: true,
			courses: [...demoCourses],
			course: null,
		});
	});
});
