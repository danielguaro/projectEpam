import './courseCard.css';

import { theCourses, theUser } from '../../../../helpers/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Link } from 'react-router-dom';
import { getTime } from '../../../../helpers/';
import { removeCourse } from '../../../../store/courses';

export const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
	allAuthors,
}) => {
	const [deletedCourseId, setDeletedCourseId] = useState(null);
	const dispatch = useDispatch();
	const allCourses = useSelector(theCourses).courses;
	const role = useSelector(theUser).role;
	const token = useSelector(theUser).token;

	const authorsNames = allAuthors
		.filter((author) => authors.includes(author.id))
		.map((author) => author.name);

	let auth = authorsNames.join(', ');
	let time = getTime(duration);

	useEffect(() => {
		if (deletedCourseId !== null) {
			setDeletedCourseId(null);
		}
	}, [allCourses]);

	const handleDelete = (courseId) => {
		dispatch(removeCourse(courseId, token));
		setDeletedCourseId(courseId);
	};

	const buttons = (
		<>
			<Link to={`/courses/update/${id}`}>
				<Button className={'editButton'} />
			</Link>
			<Button className={'deleteButton'} onClick={() => handleDelete(id)} />
		</>
	);

	return (
		<article data-testid='course-card' className='courseCard-box'>
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
					{role === 'admin' && buttons}
				</div>
			</div>
		</article>
	);
};
