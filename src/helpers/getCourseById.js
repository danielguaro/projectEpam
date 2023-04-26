import { useSelector } from 'react-redux';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const getCourseById = (id) => {
	// const { init } = useContext(UserContext);
	const theCourses = useSelector((state) => state.courses.coursesState.courses);
	// console.log(theCourses);
	let courses = theCourses;
	return courses.find((course) => course.id === id);
};
