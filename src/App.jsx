import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { login, logout } from './store/user';
import { useDispatch, useSelector } from 'react-redux';

import { Courses } from './components/Courses/Courses';
import { CoursesRoutes } from './components/routes/CoursesRoutes';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/publicRoute';
import { Registration } from './components/Registration/Registration';
import { UserProvider } from './context/UserProvider';
import { useEffect } from 'react';
// import { createNewAuthor, createNewCourse } from './helpers/providers';

export const App = () => {
	// para percistencia de data
	// const { isAuth, name, email, token } = useSelector((state) => state.user);
	// console.log(isAuth, name, email, token);
	// const user = { isAuth, name, email, token };
	// console.log(user);
	const dispatch = useDispatch();
	// console.log(token);
	// const aFunction = () => {
	// 	if (!token) return dispatch(logout());
	// 	dispatch(login(isAuth, name, email, token));
	// };
	// useEffect(() => {
	// 	aFunction();
	// }, [token]);
	//
	//

	// const TheToken = localStorage.getItem('token');
	// const getData = async () => {
	// 	const response = await fetch(`http://localhost:4000/users/${'daniel'}`);
	// 	const data = await response.json();
	// 	console.log(data);
	// };
	// getData();
	// //
	//
	// const { isAuth, name, email, token } = useSelector(
	// 	(state) => state.user.userState
	// );
	// const { name: authorsname } = useSelector(
	// 	(state) => state.authors.authorsState
	// );
	// console.log('authorsname', authorsname);
	// console.log(token);
	// createNewAuthor('name', token);
	// createNewCourse(
	// 	'example',
	// 	'description',
	// 	50,
	// 	['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
	// 	'Bearer ceQwBsFtymd7uItl3EA1I7aycE16gYe0btxetsL4J2w2H+P5M/CB1h2PGHpAu6lWHbEYXCPb9xjBUUi1kDm6XPP225tb6inEsHkHsyvEzExcHN2KZGyL+jHC56/6j0QVwJ2ptoj6IGVpPu62r80wEL2zmTPm7yqQ5bm280KdZW9c/N5iBj/xrdo88S+UflI8QnX7r5+w/eh30ihDgJqp4J2H8hjkza423uB2z33+x9rbH8E+GaR8H/pmM7bdgAJFJprgjF+Nwp8wW8Z3oSNhViyZOIgzUEvBJYudx+9FTyC5J6o4mmz2rOw81phLNOEUs14TYrDcUjWFYEE172q/XA=='
	// );

	// const theCourses = useSelector((state) => state.courses.coursesState);
	// const theAuthors = useSelector((state) => state.authors.authorsState);
	// console.log(isAuth);
	// const user = { isAuth, name, email, token };
	// const blabla = () => {
	// 	console.log(isAuth, name, email, token);
	// 	const user = { isAuth, name, email, token };
	// 	console.log(user);
	// 	return dispatch(login(user));
	// };
	// useEffect(() => {
	// 	const TheToken = localStorage.getItem('token');
	// 	if (!TheToken) return dispatch(logout());
	// 	dispatch(login());
	// }, [dispatch]);

	return (
		<UserProvider>
			<Routes>
				<Route
					path='/login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='/registration'
					element={
						<PublicRoute>
							<Registration />
						</PublicRoute>
					}
				/>
				{/* <Routes>
						<Route path='login' element={<Login />} />
						<Route path='registration' element={<Registration />} />
					</Routes> */}

				<Route
					path='/*'
					element={
						<PrivateRoute>
							<CoursesRoutes />
						</PrivateRoute>
					}
				/>
				{/* <Route path='/*' element={<CoursesRoutes />} /> */}
			</Routes>
		</UserProvider>
	);
};
