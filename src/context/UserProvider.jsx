import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../components/Courses/components/data';

import { UserContext } from './UserContext';
import { useState } from 'react';

// const user = {
// 	name: 'Daniel',
// 	email: 'blabla@gmail.com',
// };
const init = () => {
	return JSON.parse(localStorage.getItem('courses')) || mockedCoursesList;
};
const initAuthors = () => {
	return JSON.parse(localStorage.getItem('authors')) || mockedAuthorsList;
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});
	return (
		// En el value se manda un objeto
		<UserContext.Provider value={{ user, setUser, init, initAuthors }}>
			{children}
		</UserContext.Provider>
	);
};
