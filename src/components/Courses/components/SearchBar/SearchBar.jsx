import './searchBar.css';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import { useForm } from '../../../../hooks/useForm';

export const SearchBar = ({ searchedCourses, allCourses }) => {
	const navigate = useNavigate();

	const { search, onInputChange } = useForm({
		search: '',
	});

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
		if (foundCourses.length === 0) navigate('/courses');
		if (foundCourses.length > 0) navigate(`?q=${search.toLowerCase().trim()}`);
		searchedCourses(foundCourses);
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
