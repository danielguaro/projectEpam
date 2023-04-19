import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const getCourseById = (id) => {
	const { init } = useContext(UserContext);

	let courses = init();
	return courses.find((course) => course.id === id);
};
