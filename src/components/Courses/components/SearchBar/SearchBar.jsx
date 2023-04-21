import './searchbar.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import queryString from 'query-string';
import { useForm } from '../../../../hooks/useForm';

export const SearchBar = ({ searchedCourses, allCourses }) => {
	//
	const navigate = useNavigate();
	const location = useLocation();
	// console.log({ location });
	const { q = '' } = queryString.parse(location.search);
	// console.log({ q });

	//

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

	// console.log(courses);
	// console.log(allCourses);
	// useEffect(() => {
	// 	onSearchClick();
	// }, [q]);

	const onSearchClick = () => {
		const foundCourses = getCourseByName(search);
		// console.log(foundCourses.length);
		if (foundCourses.length === 0) navigate('/courses');
		if (foundCourses.length > 0) navigate(`?q=${search.toLowerCase().trim()}`);
		setCourses(foundCourses);
		// console.log(setCourses);
		searchedCourses(foundCourses);
		// if (search.trim().length <= 3) navigate('/courses');
		// navigate(`?q=${search.toLowerCase().trim()}`);
	};

	return (
		<>
			<div className='searchBar'>
				<Input
					onSubmit={onSearchSubmit}
					name={'search'}
					placeholder={'Enter course name...'}
					value={search}
					onChange={onInputChange}
				/>
				<Button buttonText={'Search'} onClick={onSearchClick} />
			</div>
		</>
	);
};
