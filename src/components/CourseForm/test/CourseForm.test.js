import { addNewAuthor, addNewEmptyAuthor } from '../../../store/authors';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CourseForm } from '../../CourseForm/CourseForm';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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
		// check that are 2 lists
		const authorLists = screen.getAllByRole('authorsList');
		expect(authorLists).toHaveLength(2);

		// check that authorLists has the correct authors
		const courseAuthorList = authorLists[0];
		const courseAuthors =
			storeMo.getState().courses.coursesState.courses[0].authors;
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
		const courseAuthorList = screen.queryByRole('courseAuthorListEmpty');
		expect(courseAuthorList).toBeNull;
	});
});

// For calling a dispatch i must work with my thunks
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

	test('"Create author" should call dispatch', async () => {
		render(
			<Provider store={storeMo}>
				<MemoryRouter>
					<CourseForm />
				</MemoryRouter>
			</Provider>
		);
		const dispatch = jest.fn();
		const createAuthorButton = screen.getByRole('button', {
			name: /create author/i,
		});
		fireEvent.click(createAuthorButton);
		await waitFor(() => {
			addNewAuthor()(dispatch);
			expect(dispatch).toHaveBeenCalledWith(addNewEmptyAuthor());
		});
	});
});

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

	test('"Add author" should Add an author.', async () => {
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

	test('"Delete author" should Delete an author .', async () => {
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
		const DeleteAuthorButton = screen.getAllByRole('button', {
			name: 'Delete author',
		})[0];
		fireEvent.click(DeleteAuthorButton);
		await waitFor(() => {
			const authorsList = screen.getByRole('courseAuthorListEmpty');
			expect(authorsList).toHaveTextContent('Author list is empty');
		});
	});
});
