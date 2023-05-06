import { render, screen } from '@testing-library/react';

import { Header } from '../Header';
import { Logo } from '../components/Logo/Logo';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import book_logo from '../../assets/bookLogo.png';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Tests in <Header/>', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
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
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
	});

	test('should have a logo in <Header/>', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);
		const logo = screen.getByAltText('Book_logo');
		expect(logo).toBeInTheDocument();
	});

	test('should have a img', () => {
		render(<Logo src={book_logo} />);
		const img = screen.getByTestId('logo-img');
		expect(img).toHaveAttribute('src', expect.stringContaining('bookLogo.png'));
	});

	test('should show user name when user is logged in', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);
		const userName = screen.getByText('Daniel test');
		expect(userName).toBeInTheDocument();
	});

	test('should not show user name when user is not logged in', () => {
		store = mockStore({
			user: {
				userState: {
					isAuth: false,
					name: '',
					email: '',
					token: '',
					role: '',
					message: '',
				},
			},
			courses: {
				coursesState: [],
			},
			authors: {
				authorsState: [],
			},
		});
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);
		const userName = screen.queryByText('Daniel test');
		expect(userName).not.toBeInTheDocument();
		const heading = screen.queryByRole('heading', { level: 3 });
		expect(heading).not.toBeInTheDocument();
	});
});
