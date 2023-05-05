import { render, screen } from '@testing-library/react';

import { CourseCard } from '../CourseCard';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getDate } from '../../../../../helpers';

const mockStore = configureStore([]);

describe('Tests Title in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {
					// isAuth: true,
					// name: 'Daniel test',
					// email: 'dani@example.com',
					// token: 'fake_token',
					// role: 'admin',
					// message: '',
				},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	test('should display the title', () => {
		const title = 'TitleExample';
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={title}
						description={'I am a description'}
						creationDate={'4/05/2023'}
						duration={200}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const titleElement = screen.getByText(title);
		expect(titleElement).toBeInTheDocument();
	});

	test('should display title with h1 tag', () => {
		const title = 'Example Title';
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={1}
						title={title}
						description={'Example description'}
						creationDate={'4/05/2023'}
						duration={60}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const titleElement = screen.getByRole('heading', { level: 1 });
		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveTextContent(title);
	});

	test('should not display title if not provided', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={1}
						description={'Example description'}
						creationDate={'2022-05-04'}
						duration={60}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const titleElement = screen.queryByText(/example title/i); // must be null
		// the i means that will search for a str without care if is upper or lower
		expect(titleElement).not.toBeInTheDocument();
	});
});

// Test for description
describe('Tests description in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {
					isAuth: true,
					role: 'admin',
				},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	test('should display the description', () => {
		const description = 'I am a description';
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={''}
						description={description}
						creationDate={'4/05/2023'}
						duration={200}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const descriptionElement = screen.getByText(description);
		expect(descriptionElement).toBeInTheDocument();
	});

	test('should not display description if not provided', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={'Title'}
						creationDate={'4/05/2023'}
						duration={200}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const descriptionElement = screen.queryByText('I am a description');
		expect(descriptionElement).not.toBeInTheDocument();
	});
});

// Test for duration
describe('Tests duration in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {
					isAuth: true,
					role: 'admin',
				},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	test('should display duration in correct form (80mins)', () => {
		const duration = 80;
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={1}
						title={'Example title'}
						description={'Example description'}
						creationDate={'4/05/2023'}
						duration={duration}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const durationElement = screen.getByText('Duration: 01:20 hours');
		expect(durationElement).toBeInTheDocument();
	});
	test('should display duration in correct form (240mins)', () => {
		const duration = 240;
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={1}
						title={'Example title'}
						description={'Example description'}
						creationDate={'4/05/2023'}
						duration={duration}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const durationElement = screen.getByText('Duration: 04:00 hours');
		expect(durationElement).toBeInTheDocument();
	});
	test('should display duration in correct form (30mins)', () => {
		const duration = 30;
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={1}
						title={'Example title'}
						description={'Example description'}
						creationDate={'4/05/2023'}
						duration={duration}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		const durationElement = screen.getByText('Duration: 00:30 hours');
		expect(durationElement).toBeInTheDocument();
	});

	// test('should throw error when duration is not passed as prop', () => {
	// 	const originalError = console.error;
	// 	console.error = jest.fn();

	// 	expect(() =>
	// 		render(
	// 			<Provider store={store}>
	// 				<MemoryRouter>
	// 					<CourseCard
	// 						id={1}
	// 						title={'Example title'}
	// 						description={'Example description'}
	// 						creationDate={'4/05/2023'}
	// 						authors={[1]}
	// 						allAuthors={[{ name: 'Daniel', id: 1 }]}
	// 					/>
	// 				</MemoryRouter>
	// 			</Provider>
	// 		)
	// 	).toThrow();

	// 	expect(console.error).toHaveBeenCalled();
	// 	console.error = originalError;
	// });

	test('should display "Duration not available" when duration is not passed as prop', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={1}
						title={'Example title'}
						description={'Example description'}
						creationDate={'4/05/2023'}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);

		const durationElement = screen.queryByText('Duration');
		expect(durationElement).toBeNull();
	});
});

// Test for authors list
describe('Tests authorList in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {
					isAuth: true,
					role: 'admin',
				},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	test('should display two author in list', () => {
		const allAuthors = [
			{ name: 'Daniel', id: 1 },
			{ name: 'Juan', id: 2 },
		];
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={'title'}
						description={'I am a description'}
						creationDate={'4/05/2023'}
						duration={200}
						authors={[1, 2]}
						allAuthors={allAuthors}
					/>
				</MemoryRouter>
			</Provider>
		);
		const authorListElement = screen.getByText('Authors: Daniel, Juan');
		expect(authorListElement).toBeInTheDocument();
	});

	test('should display one author in list', () => {
		const allAuthors = [
			{ name: 'Daniel', id: 1 },
			{ name: 'Juan', id: 2 },
		];
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={'title'}
						description={'I am a description'}
						creationDate={'4/05/2023'}
						duration={200}
						authors={[1]}
						allAuthors={allAuthors}
					/>
				</MemoryRouter>
			</Provider>
		);
		const authorListElement = screen.getByText('Authors: Daniel');
		expect(authorListElement).toBeInTheDocument();
	});

	test('should display none author in list', () => {
		const allAuthors = [
			{ name: 'Daniel', id: 1 },
			{ name: 'Juan', id: 2 },
		];
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={'title'}
						description={'I am a description'}
						creationDate={'4/05/2023'}
						duration={200}
						authors={[]}
						allAuthors={allAuthors}
					/>
				</MemoryRouter>
			</Provider>
		);
		const authorListElement = screen.getByText('Authors:');
		expect(authorListElement).toBeInTheDocument();
	});
});

// Test for created date
describe('Tests date in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {
					isAuth: true,
					role: 'admin',
				},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	test('should display todayDate', () => {
		const date = getDate();
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={'title'}
						description={'I am a description'}
						creationDate={date}
						duration={200}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		screen.debug();
		const dateElement = screen.getByText(`Created: ${date}`);
		expect(dateElement).toBeInTheDocument();
	});
	test('should display 05/04/2023', () => {
		const date = '05/04/2023';
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard
						id={50}
						title={'title'}
						description={'I am a description'}
						creationDate={date}
						duration={200}
						authors={[1]}
						allAuthors={[{ name: 'Daniel', id: 1 }]}
					/>
				</MemoryRouter>
			</Provider>
		);
		screen.debug();
		const dateElement = screen.getByText(`Created: ${date}`);
		expect(dateElement).toBeInTheDocument();
	});
});
