import './courses.css';

import { useContext, useEffect, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { SearchBar } from './components/SearchBar/SearchBar';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Courses = ({}) => {
	const { init, initAuthors } = useContext(UserContext);
	const navigate = useNavigate();

	let allCourses = init();
	let allAuthors = initAuthors();

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');
	// 	if (!token) {
	// 		navigate('/login');
	// 	}
	// }, [navigate]);

	const [courses, setCourses] = useState([]);
	const [state, setState] = useState(false);

	const handleChildDataChange = (newData) => {
		setCourses(newData);
	};

	const clickAdding = () => {
		navigate('/courses/add');
	};

	return (
		<>
			{state ? (
				<CreateCourse
					// init={init}
					// initAuthors={initAuthors}
					clickAdding={clickAdding}
				/>
			) : courses.length > 0 ? (
				<>
					<div className='coursesSearch-button'>
						<SearchBar
							searchedCourses={handleChildDataChange}
							theState={clickAdding}
							allCourses={allCourses}
						/>
						<Button buttonText={'Add new course'} onClick={clickAdding} />
					</div>
					{courses.map((course) => (
						<CourseCard key={course.id} {...course} allAuthors={allAuthors} />
					))}
				</>
			) : (
				<>
					<div className='coursesSearch-button'>
						<SearchBar
							searchedCourses={handleChildDataChange}
							theState={clickAdding}
							allCourses={allCourses}
						/>
						<Button buttonText={'Add new course'} onClick={clickAdding} />
					</div>
					{allCourses.map((course) => (
						<CourseCard {...course} key={course.id} allAuthors={allAuthors} />
					))}
				</>
			)}
		</>
	);
};
