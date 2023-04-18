import './courseCard.css';

import { Button } from '../../../../common/Button/Button';
import { getTime } from '../../../../helpers/';

export const CourseCard = ({
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
				<Button buttonText={'Show courses'} />
			</div>
		</article>
	);
};
