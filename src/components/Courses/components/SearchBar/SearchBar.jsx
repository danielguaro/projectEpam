import './searchbar.css';
import { mockedCoursesList } from '../data/data';
import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { useForm } from '../../../../hooks/useForm';
import { CourseCard } from '../CourseCard/CourseCard';
import { useState } from 'react';

export const SearchBar = ({ searchedCourses, allCourses }) => {
	console.log(allCourses);
	const { search, onInputChange } = useForm({
		search: '',
	});
	const [courses, setCourses] = useState([]);
	const getCourseByName = (name = '') => {
		name = name.toLowerCase().trim();
		if (name.length <= 3) return [];
		return allCourses.filter(
			(course) =>
				course.id.toLowerCase().includes(name) ||
				course.title.toLowerCase().includes(name)
		);
	};

	const onSearchSubmit = (e) => {
		e.preventDefault();

		if (search.trim().length === 0) onSearchClick();
		if (search.trim().length <= 3) return;
		onSearchClick();
	};

	const onSearchClick = () => {
		const foundCourses = getCourseByName(search);
		// console.log(foundCourses);
		setCourses(foundCourses);
		searchedCourses(foundCourses);
	};

	return (
		<>
			<div className='searchBar'>
				{/* <form onSubmit={onSearchSubmit}>
				<label>
					<input
						type='text'
						placeholder='search...'
						name='search'
						autoComplete='off'
						value={search}
						onChange={onInputChange}
					/>
				</label>
			</form> */}
				<Input
					onSubmit={onSearchSubmit}
					name={'search'}
					placeholder={'Enter course name...'}
					value={search}
					onChange={onInputChange}
				/>
				<Button buttonText={'Search'} onClick={onSearchClick} />
				{/*  */}
			</div>
			{/* {courses.length > 0 &&
				courses.map((course) => <CourseCard key={course.id} {...course} />)} */}
		</>
	);
};
