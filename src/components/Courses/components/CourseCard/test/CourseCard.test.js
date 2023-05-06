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
				userState: {},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	// Tests for title (3)
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
		expect(titleElement).not.toBeInTheDocument();
	});
});

// Test for description (2)
describe('Tests description in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {},
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

// Test for duration (4)
describe('Tests duration in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {},
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

	test('should not display "Duration" when duration is not passed as prop', () => {
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

// Test for authors list (3)
describe('Tests authorList in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {},
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

// Test for created date (2)
describe('Tests date in <CourseCard/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			user: {
				userState: {},
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

		const dateElement = screen.getByText(`Created: ${date}`);
		expect(dateElement).toBeInTheDocument();
	});
});
