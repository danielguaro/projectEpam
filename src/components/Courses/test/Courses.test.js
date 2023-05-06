import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CourseForm } from '../../CourseForm/CourseForm';
import { Courses } from '../Courses';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Tests Length in <Course/>', () => {
	let storeMo;
	beforeEach(() => {
		storeMo = mockStore({
			user: {
				userState: {
					isAuth: true,
					name: 'Daniel test',
					email: 'dani@example.com',
					token: 'fake_token',
					role: 'admin',
					message: '',
				},
			},
			courses: {
				coursesState: {
					courses: [
						{
							title: 'title1',
							description: 'description1',
							duration: 200,
							creationDate: '03/05/2023',
							id: '50',
							authors: ['1', '2'],
						},
						{
							title: 'title2',
							description: 'description2',
							duration: 100,
							creationDate: '04/05/2023',
							id: '60',
							authors: ['2'],
						},
					],
				},
			},
			authors: {
				authorsState: {
					authors: [
						{ name: 'Daniel', id: '1' },
						{ name: 'Juan', id: '2' },
					],
				},
			},
		});
	});

	test('should display amount of CourseCard equal length of courses array', () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);
		const courseCards = screen.getAllByTestId('course-card');
		const coursesState = storeMo.getState().courses.coursesState;

		expect(courseCards.length).toBe(coursesState.courses.length);
	});
});

describe('Tests 0 Length in <Course/>', () => {
	let storeMo;
	beforeEach(() => {
		storeMo = mockStore({
			user: {
				userState: {
					isAuth: true,
					name: 'Daniel test',
					email: 'dani@example.com',
					token: 'fake_token',
					role: 'admin',
					message: '',
				},
			},
			courses: {
				coursesState: {
					courses: [],
				},
			},
			authors: {
				authorsState: {
					authors: [],
				},
			},
		});
	});

	test('should displayEmpty container if courses array length is 0', () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);
		const emptyContainer = screen.getByText('No courses available');
		expect(emptyContainer).toBeInTheDocument();
	});
});

describe('Tests admin functionality in <Course/>', () => {
	let storeMo;
	beforeEach(() => {
		storeMo = mockStore({
			user: {
				userState: {
					isAuth: true,
					name: 'Daniel test',
					email: 'dani@example.com',
					token: 'fake_token',
					role: 'admin',
					message: '',
				},
			},
			courses: {
				coursesState: {
					courses: [
						{
							title: 'title1',
							description: 'description1',
							duration: 200,
							creationDate: '03/05/2023',
							id: '50',
							authors: ['1', '2'],
						},
						{
							title: 'title2',
							description: 'description2',
							duration: 100,
							creationDate: '04/05/2023',
							id: '60',
							authors: ['2'],
						},
					],
				},
			},
			authors: {
				authorsState: {
					authors: [
						{ name: 'Daniel', id: '1' },
						{ name: 'Juan', id: '2' },
					],
				},
			},
		});
	});

	test('should navigate to "/courses/add" after clicking "Add new course" button', async () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter initialEntries={['/courses']}>
					<Routes>
						<Route path='/courses' element={<Courses />} />
						<Route path='/courses/add' element={<CourseForm />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);

		const addCourseButton = screen.getByText('Add new course');
		fireEvent.click(addCourseButton);

		await waitFor(() => {
			const courseForm = screen.getByTestId('course-form');
			expect(courseForm).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: 'Create course' })
			).toBeInTheDocument();
		});
	});
});

describe('Tests user limitation in <Course/>', () => {
	let storeMo;
	beforeEach(() => {
		storeMo = mockStore({
			user: {
				userState: {
					isAuth: true,
					name: 'Daniel test',
					email: 'dani@example.com',
					token: 'fake_token',
					role: 'user',
					message: '',
				},
			},
			courses: {
				coursesState: {
					courses: [
						{
							title: 'title1',
							description: 'description1',
							duration: 200,
							creationDate: '03/05/2023',
							id: '50',
							authors: ['1', '2'],
						},
						{
							title: 'title2',
							description: 'description2',
							duration: 100,
							creationDate: '04/05/2023',
							id: '60',
							authors: ['2'],
						},
					],
				},
			},
			authors: {
				authorsState: {
					authors: [
						{ name: 'Daniel', id: '1' },
						{ name: 'Juan', id: '2' },
					],
				},
			},
		});
	});

	test('should not display buttons', () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);
		const addButton = screen.queryByText('Add new course');
		expect(addButton).not.toBeInTheDocument();
	});
});
