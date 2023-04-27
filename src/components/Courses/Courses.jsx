import './courses.css';

import { theAuthors, theCourses } from '../../helpers/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { showAllCourses } from '../../store/courses';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Courses = () => {
	const dispatch = useDispatch();
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();
	// const theCourses = useSelector((state) => state.courses.coursesState);
	// const theAuthors = useSelector((state) => state.authors.authorsState);
	const allInfoCourse = useSelector(theCourses);
	const allCourses = allInfoCourse.courses;
	const allInfoAuthors = useSelector(theAuthors);
	const allAuthors = allInfoAuthors.authors;

	// console.log('theCourses', allCourses);
	// console.log('theAuthors', allAuthors);

	if (allCourses.length === 0) {
		dispatch(showAllCourses());
	}

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
