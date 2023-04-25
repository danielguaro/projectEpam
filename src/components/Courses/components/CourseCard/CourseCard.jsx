import './courseCard.css';

import { Button } from '../../../../common/Button/Button';
import { Link } from 'react-router-dom';
import { getTime } from '../../../../helpers/';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteCourseById, showAllCourses } from '../../../../store/courses';

export const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
	allAuthors,
}) => {
	const authorsNames = allAuthors
		.filter((author) => authors.includes(author.id))
		.map((author) => author.name);

	let auth = authorsNames.join(', ');
	let time = getTime(duration);
	const theCourses = useSelector((state) => state.courses.coursesState.courses);
	console.log(theCourses);

	const [deletedCourseId, setDeletedCourseId] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		if (deletedCourseId !== null) {
			setDeletedCourseId(null);
		}
	}, [theCourses]);

	console.log(deletedCourseId);
	const handleDelete = (courseId) => {
		console.log('click');
		dispatch(deleteCourseById(courseId));
		dispatch(showAllCourses());
		setDeletedCourseId(courseId);
	};

	return (
		<article className='courseCard-box'>
			<div className='courseCard-title-description'>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div className='courseCard-restInfo'>
				<h3 className='courseCard-restInfo--authors'>Authors: {auth}</h3>
				<h3>Duration: {time}</h3>
				<h3>Created: {creationDate}</h3>
				<div className='buttons'>
					<Link to={`/courses/${id}`}>
						<Button buttonText={'Show course'} />
					</Link>
					<Button className={'editButton'} />
					<Button className={'deleteButton'} onClick={() => handleDelete(id)} />
				</div>
			</div>
		</article>
	);
};
