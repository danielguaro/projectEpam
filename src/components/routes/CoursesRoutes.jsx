import { Navigate, Route, Routes } from 'react-router-dom';

import { CourseInfo } from '../CourseInfo/CourseInfo';
import { Courses } from '../Courses/Courses';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { Header } from '../Header/Header';
import { SearchBar } from '../Courses/components/SearchBar/SearchBar';

export const CoursesRoutes = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='courses' element={<Courses />} />
				<Route path='courses/add' element={<CreateCourse />} />
				<Route path='courses/search' element={<SearchBar />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />

				{/* if it goes to a pages that i don´t want it to go */}
				{/* <Route path='/*' element={<Courses />} /> */}
				{/* another way */}
				<Route path='/*' element={<Navigate to='/courses' />} />
				<Route path='/' element={<Navigate to='/courses' />} />
			</Routes>
		</>
	);
};
