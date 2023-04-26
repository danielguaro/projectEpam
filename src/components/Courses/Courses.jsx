import './courses.css';

import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { SearchBar } from './components/SearchBar/SearchBar';
import { UserContext } from '../../context/UserContext';
import { showAllAuthors } from '../../store/authors';
import { showAllCourses } from '../../store/courses';
import { useNavigate } from 'react-router-dom';

export const Courses = ({}) => {
	// useDispatch()
	const dispatch = useDispatch();
	// dispatch(showAllCourses());
	// dispatch(showAllAuthors());
	const theCourses = useSelector((state) => state.courses.coursesState);
	const theAuthors = useSelector((state) => state.authors.authorsState);
	console.log('-----', theCourses);
	console.log('-----authors', theAuthors);
	const allyCourses = theCourses.courses;
	const allyAuthors = theAuthors.authors;
	console.log('theCourses', allyCourses);
	console.log('theAuthors', allyAuthors);

	// useEffect(() => {
	// 	if (allyCourses === 'undefined') {
	// 		dispatch(showAllCourses());
	// 	}
	// }, []);
	if (allyCourses.length === 0) {
		dispatch(showAllCourses());
	}

	const { init, initAuthors } = useContext(UserContext);
	const navigate = useNavigate();

	let allCourses = init();
	let allAuthors = initAuthors();

	// const getAuthors = async () => {
	// 	const response = await fetch('http://localhost:4000/authors/all');
	// 	const data = await response.json();
	// 	// console.log(data.result);

	// 	if (data.successful === false) {
	// 		return {
	// 			courses: [],
	// 		};
	// 	}
	// 	console.log(data);
	// 	return data.result;
	// };
	// getAuthors();

	// console.log(allCourses);
	const getCourses = async () => {
		const response = await fetch('http://localhost:4000/courses/all');
		const data = await response.json();
		console.log(data);
		console.log(data.result);
		data.result.map((course) => console.log(course));
		// const { title, description, creationDate, id, duration, authors } =
		// console.log(title, description, creationDate, id, duration, authors);
	};
	// getCourses();

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');
	// 	if (!token) {
	// 		navigate('/login');
	// 	}
	// }, [navigate]);

	const [courses, setCourses] = useState([]);

	const handleChildDataChange = (newData) => {
		setCourses(newData);
	};

	const clickAdding = () => {
		navigate('/courses/add');
	};

	return (
		<>
			{courses.length > 0 ? (
				<>
					<div className='coursesSearch-button'>
						<SearchBar
							searchedCourses={handleChildDataChange}
							theState={clickAdding}
							allCourses={allyCourses}
						/>
						<Button buttonText={'Add new course'} onClick={clickAdding} />
					</div>
					{courses.map((course) => (
						<CourseCard key={course.id} {...course} allAuthors={allyAuthors} />
					))}
				</>
			) : (
				<>
					<div className='coursesSearch-button'>
						<SearchBar
							searchedCourses={handleChildDataChange}
							theState={clickAdding}
							allCourses={allyCourses}
						/>
						<Button buttonText={'Add new course'} onClick={clickAdding} />
					</div>
					{allyCourses.map((course) => (
						<CourseCard {...course} key={course.id} allAuthors={allyAuthors} />
					))}
				</>
			)}
		</>
	);
};
