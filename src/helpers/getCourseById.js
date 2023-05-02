import { useSelector } from 'react-redux';

export const getCourseById = (id) => {
	const theCourses = useSelector((state) => state.courses.coursesState.courses);
	let courses = theCourses;
	return courses.find((course) => course.id === id);
};
