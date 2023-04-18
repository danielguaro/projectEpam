import './App.css';

import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';

export const App = () => {
	return (
		<>
			<Header />
			<Courses />
		</>
	);
};
