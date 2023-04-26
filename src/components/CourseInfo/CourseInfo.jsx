import './courseInfo.css';

import { Link, Navigate, useParams } from 'react-router-dom';
import { getCourseById, getTheAuthors, getTime } from '../../helpers';

export const CourseInfo = () => {
	const { courseId } = useParams();

	const course = getCourseById(courseId);
	if (!course) {
		return <Navigate to='/courses' />;
	}
	let authors = getTheAuthors(course?.authors);
	let time = getTime(course?.duration);
	console.log(courseId);
	return (
		<>
			<div className='courseInfoContainer'>
				<p>
					<Link to='/courses'> {'<- '}Back to courses</Link>
				</p>
				<h1>{course?.title}</h1>
				<div className='courseInfoContainer-generalInfo'>
					<div className='courseInfoContainer-description'>
						<p>{course?.description}</p>
					</div>
					<aside>
						<p>
							<strong>ID: </strong>
							{course?.id}
						</p>
						<p>
							<strong>Duration: </strong>
							{time}
						</p>
						<p>
							<strong>Created: </strong>
							{course?.creationDate}
						</p>
						<p>
							<strong>Author(s): </strong>
							<br />
							{authors}
						</p>
					</aside>
				</div>
			</div>
		</>
	);
};
