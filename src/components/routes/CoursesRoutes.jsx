import { Navigate, Route, Routes } from 'react-router-dom';

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

				{/* Por si ingresa a una página que no quiero que ingrese */}
				{/* <Route path='/*' element={<Courses />} /> */}
				{/* Otro método */}
				<Route path='/*' element={<Navigate to='/courses' />} />
				<Route path='/' element={<Navigate to='/courses' />} />
			</Routes>
		</>
	);
};
