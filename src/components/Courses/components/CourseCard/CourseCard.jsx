import './courseCard.css';

import { Button } from '../../../../common/Button/Button';
import { getTime } from '../../../../helpers/getTime';
import { mockedAuthorsList } from '../data/data';

export const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
	allAuthors,
}) => {
	console.log(authors);
	console.log(allAuthors);
	const authorsNames = allAuthors
		.filter((author) => authors.includes(author.id))
		.map((author) => author.name);

	let auth = authorsNames.join(', ');
	let time = getTime(duration);
	console.log(creationDate);
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
