import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import { addNewAuthor, addNewEmptyAuthor } from '../../../store/authors';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CourseForm } from '../../CourseForm/CourseForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createNewAuthor } from '../../../store/authors/authorsUtils';
import { useNavigate } from 'react-router-dom';

const mockStore = configureStore([]);

describe('Tests in <CourseForm/>', () => {
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

	test('should show authors lists .', () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<CourseForm />
				</MemoryRouter>
			</Provider>
		);
		// screen.debug();
		// Verifica que haya dos listas de autores
		const authorLists = screen.getAllByRole('authorsList');
		expect(authorLists).toHaveLength(2);

		// Verifica que la lista de autores del curso tenga los autores correctos
		const courseAuthorList = authorLists[0];
		// console.log(courseAuthorList);
		const courseAuthors =
			storeMo.getState().courses.coursesState.courses[0].authors;
		console.log(courseAuthors); // ['1','2']
		const expectedCourseAuthors = storeMo
			.getState()
			.authors.authorsState.authors.filter((author) =>
				courseAuthors.includes(author.id)
			)
			.map((author) => author.name);

		expectedCourseAuthors.map((authorName) => {
			expect(
				screen.getByText(authorName, { container: courseAuthorList })
			).toBeInTheDocument();
		});
	});

	test('should show course authors (emptyList).', () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<CourseForm />
				</MemoryRouter>
			</Provider>
		);
		// screen.debug();
		const courseAuthorList = screen.queryByRole('courseAuthorListEmpty');
		expect(courseAuthorList).toBeNull;
	});
});

// // For calling a dispatch i must work with my thunks
// addNewEmptyAuthor
// createNewAuthor
jest.mock('../../../store/authors/authorsUtils');
describe('test in <CourseForm/> needed dispatch (thunk)', () => {
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

	test('should call dispatch', async () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<CourseForm />
				</MemoryRouter>
			</Provider>
		);
		// const value = addNewEmptyAuthor('Daniel', 'ok');
		// console.log(value, 'hi'); //  { type: 'authors/addNewEmptyAuthor', payload: 'Daniel' } hi
		const dispatch = jest.fn();
		const createAuthorButton = screen.getByRole('button', {
			name: /create author/i,
		});
		fireEvent.click(createAuthorButton);
		await waitFor(() => {
			// expect(dispatch).toHaveBeenCalledWith(addNewEmptyAuthor())
			addNewAuthor()(dispatch);
			expect(dispatch).toHaveBeenCalledWith(addNewEmptyAuthor());
		});
		//
		// await addNewAuthor()(dispatch);
		// expect(dispatch).toHaveBeenCalledWith(addNewEmptyAuthor());
	});
});

//
//
//
describe('Tests in <CourseForm/> Add and Delete authors', () => {
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

	test('should Add an author .', async () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<CourseForm />
				</MemoryRouter>
			</Provider>
		);

		const addAuthorButton = screen.getAllByRole('button', {
			name: 'Add author',
		})[0];
		fireEvent.click(addAuthorButton);
		await waitFor(() => {
			const authorsList = screen.getByRole('courseAuthorList');
			expect(authorsList).toHaveTextContent('Daniel');
		});
	});

	test('should Delete an author .', async () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<CourseForm />
				</MemoryRouter>
			</Provider>
		);

		const addAuthorButton = screen.getAllByRole('button', {
			name: 'Add author',
		})[0];
		fireEvent.click(addAuthorButton);
		await waitFor(() => {
			const authorsList = screen.getByRole('courseAuthorList');
			expect(authorsList).toHaveTextContent('Daniel');
		});
		screen.debug();
		const DeleteAuthorButton = screen.getAllByRole('button', {
			name: 'Delete author',
		})[0];
		fireEvent.click(DeleteAuthorButton);
		await waitFor(() => {
			const authorsList = screen.getByRole('courseAuthorListEmpty');
			expect(authorsList).toHaveTextContent('Author list is empty');
		});
		screen.debug();
	});
});
