import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminRoute } from '../../router/AdminRoute';
import { CourseForm } from '../CourseForm/CourseForm';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { Courses } from '../Courses/Courses';
import { Header } from '../Header/Header';
import { SearchBar } from '../Courses/components/SearchBar/SearchBar';

export const CoursesRoutes = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='courses' element={<Courses />} />
				<Route path='courses/search' element={<SearchBar />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />

				<Route
					path='courses/add'
					element={
						<AdminRoute>
							<CourseForm />
						</AdminRoute>
					}
				/>
				<Route
					path='courses/update/:courseId'
					element={
						<AdminRoute>
							<CourseForm />
						</AdminRoute>
					}
				/>

				<Route path='/*' element={<Navigate to='/courses' />} />
				<Route path='/' element={<Navigate to='/courses' />} />
			</Routes>
		</>
	);
};
