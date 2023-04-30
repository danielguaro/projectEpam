import './courseCard.css';

import { deleteCourseById, removeCourse } from '../../../../store/courses';
import { theCourses, theUser } from '../../../../helpers/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Button } from '../../../../common/Button/Button';
import { Link } from 'react-router-dom';
import { deleteCourse } from '../../../../helpers/providers';
import { getTime } from '../../../../helpers/';

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

	// console.log(deletedCourseId);
	const handleDelete = (courseId) => {
		// deleteCourse(courseId, token);
		dispatch(removeCourse(courseId, token));
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
					{role === 'admin' && (
						<>
							<Link to={`/courses/update/${id}`}>
								<Button className={'editButton'} />
							</Link>
							<Button
								className={'deleteButton'}
								onClick={() => handleDelete(id)}
							/>
						</>
					)}
				</div>
			</div>
		</article>
	);
};
