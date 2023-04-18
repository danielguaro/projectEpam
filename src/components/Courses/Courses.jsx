import './courses.css';

import { mockedAuthorsList, mockedCoursesList } from './components/data/data';

import { Button } from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useState } from 'react';

const init = () => {
	return JSON.parse(localStorage.getItem('courses')) || mockedCoursesList;
};
const initAuthors = () => {
	return JSON.parse(localStorage.getItem('authors')) || mockedAuthorsList;
};
export const Courses = ({}) => {
	let allCourses = init();
	let allAuthors = initAuthors();

	const [courses, setCourses] = useState([]);
	const [state, setState] = useState(false);

	const handleChildDataChange = (newData) => {
		setCourses(newData);
	};

	const clickAdding = () => {
		setState((state) => !state);
	};

	return (
		<>
			{state ? (
				<CreateCourse
					init={init}
					initAuthors={initAuthors}
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
