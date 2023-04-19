import './courseInfo.css';

import { Link, Navigate, useParams } from 'react-router-dom';
import { getCourseById, getTheAuthors, getTime } from '../../helpers';

export const CourseInfo = () => {
	// const { initAuthors } = useContext(UserContext);
	// let allAuthors = initAuthors();
	// console.log(allAuthors);
	// Importando de react router
	const { courseId } = useParams();
	console.log(courseId);
	const course = getCourseById(courseId);
	console.log(course);
	if (!course) {
		return <Navigate to='/courses' />;
	}
	let authors = getTheAuthors(course.authors);
	console.log('authors', authors);
	let time = getTime(course.duration);
	return (
		<>
			<div className='courseInfoContainer'>
				<p>
					<Link to='/courses'> {'<- '}Back to courses</Link>
				</p>
				<h1>{course.title}</h1>
				<div className='courseInfoContainer-generalInfo'>
					<div className='courseInfoContainer-description'>
						{course.description}
					</div>
					<aside>
						<p>
							<strong>ID: </strong>
							{course.id}
						</p>
						<p>
							<strong>Duration: </strong>
							{time}
						</p>
						<p>
							<strong>Created: </strong>
							{course.creationDate}
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
