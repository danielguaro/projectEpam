import './courses.css';

import { theAuthors, theCourses, theUser } from '../../helpers/selectors';
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
	const allCourses = useSelector(theCourses).courses;
	const allAuthors = useSelector(theAuthors).authors;
	const role = useSelector(theUser).role;

	const handleChildDataChange = (newData) => {
		setCourses(newData);
	};

	const clickAdding = () => {
		navigate('/courses/add');
	};

	return (
		<>
			<div className='coursesSearch-button'>
				<SearchBar
					searchedCourses={handleChildDataChange}
					theState={clickAdding}
					allCourses={allCourses}
				/>
				{role === 'admin' && (
					<Button
						buttonText={'Add new course'}
						onClick={clickAdding}
						className={'buttonNewCourse'}
					/>
				)}
			</div>
			{courses.length > 0 ? (
				courses.map((course) => (
					<CourseCard key={course.id} {...course} allAuthors={allAuthors} />
				))
			) : allCourses.length === 0 ? (
				<div>No courses available</div>
			) : (
				allCourses.map((course) => (
					<CourseCard {...course} key={course.id} allAuthors={allAuthors} />
				))
			)}
		</>
	);
};
