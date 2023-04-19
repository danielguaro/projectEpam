import './courseCard.css';

import { Button } from '../../../../common/Button/Button';
import { Link } from 'react-router-dom';
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
	const authorsNames = allAuthors
		.filter((author) => authors.includes(author.id))
		.map((author) => author.name);

	let auth = authorsNames.join(', ');
	let time = getTime(duration);
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
				<Link to={`/courses/${id}`}>
					<Button buttonText={'Show courses'} />
				</Link>
			</div>
		</article>
	);
};
