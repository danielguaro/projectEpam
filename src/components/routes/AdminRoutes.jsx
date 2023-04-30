import { Navigate, Route, Routes } from 'react-router-dom';

import { CourseForm } from '../CourseForm/CourseForm';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { Courses } from '../Courses/Courses';
import { Header } from '../Header/Header';
import { SearchBar } from '../Courses/components/SearchBar/SearchBar';

export const AdminRoutes = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='courses/add' element={<CourseForm />} />
				{/* if it goes to a pages that i don´t want it to go */}
				{/* <Route path='/*' element={<Courses />} /> */}
				{/* another way */}
				<Route path='/*' element={<Navigate to='/courses' />} />
				<Route path='/' element={<Navigate to='/courses' />} />
			</Routes>
		</>
	);
};
