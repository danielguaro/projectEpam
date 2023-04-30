import './creaeteCourse.css';

import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
	addExampleOfAuthor,
	addNewAuthor,
	showAllAuthors,
} from '../../store/authors';
import {
	addExampleOfCourse,
	showAllCourses,
	updateTheCourse,
} from '../../store/courses';
import { getCourseById, getDate, getId, getTime } from '../../helpers';
import { theAuthors, theCourses, theUser } from '../../helpers/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { updateACourse } from '../../helpers/providers';
import { useForm } from '../../hooks/useForm';

export const CourseFormUpdate = () => {
	const { courseId } = useParams();
	// console.log(courseId);

	const course = getCourseById(courseId);
	// console.log(course);
	if (!course) {
		return <Navigate to='/courses' />;
	}
	const allInfoAuthors = useSelector(theAuthors);
	const allyAuthors = allInfoAuthors.authors;
	const token = useSelector(theUser).token;
	const checkAllAuthors = () => {
		dispatch(showAllAuthors());
	};

	// allyAuthors.filter((author) => author.id !== id);
	// console.log(allyAuthors);
	const remainingAuthors = allyAuthors.filter(
		(author) => !course?.authors.includes(author.id)
	);
	// console.log(course?.authors);
	// console.log(remainingAuthors);

	const [authors, setAuthors] = useState(remainingAuthors);
	const [authorsCourse, setAuthorsCourse] = useState(course?.authors);

	const dispatch = useDispatch();

	const navigate = useNavigate();
	const goCourses = () => {
		dispatch(showAllCourses());
		navigate('/courses');
	};

	const {
		name,
		onInputChange: onInputChange2,
		onResetForm: onResetForm2,
	} = useForm({
		name: '',
	});
	const { title, description, duration, onInputChange, onResetForm } = useForm({
		title: course?.title,
		description: course?.description,
		duration: course?.duration,
	});

	// useEffect(() => {
	// 	setAuthors([...allyAuthors]);
	// }, []);

	const onFormSubmit = (e) => {
		e.preventDefault();
	};

	const createAuthor = () => {
		if (name.length <= 1) return;
		// let id = getId();
		// setAuthors([...authors, { id: id, name: name }]);

		const newAuthor = {
			name,
			// id,
		};
		dispatch(addNewAuthor(newAuthor.name, token));
		setTimeout(() => checkAllAuthors(), [300]);
		onResetForm2();
	};

	useEffect(() => {
		const remainingAuthors2 = allyAuthors.filter(
			(author) => !course?.authors.includes(author.id)
		);
		setAuthors(remainingAuthors2);
	}, [allyAuthors]);

	// add author
	const addAuthor = (id) => {
		setAuthors(authors.filter((author) => author.id !== id));
		setAuthorsCourse([...authorsCourse, id]);
	};
	//

	// Deleting author
	const deleteAuthor = (authorId) => {
		const newAuthors = [...authors];
		const author = allyAuthors.find((person) => person.id === authorId);
		newAuthors.push(author);
		setAuthors(newAuthors);
		setAuthorsCourse(authorsCourse.filter((personId) => personId !== authorId));
	};

	// To avoid numbers on the authors name
	const onKeyPress = (event) => {
		const keyCode = event.keyCode || event.which;
		const keyValue = String.fromCharCode(keyCode);
		const regex = /^[a-zA-Z\s]*$/;
		if (!regex.test(keyValue)) {
			event.preventDefault();
		}
	};
	//
	const updatingCourse = () => {
		if (title.length <= 1) {
			alert('please write a title for the course');
			return;
		}
		if (description.length <= 2) {
			alert('please write a description');
			return;
		}
		if (duration.length <= 1) {
			alert('Please choose a time longer than one minute');
			return;
		}
		if (authorsCourse.length === 0) {
			alert('please choose at least one author');
			return;
		}

		const changeDescription = description.toLowerCase();
		const newDescription =
			changeDescription.charAt(0).toUpperCase() + changeDescription.slice(1);
		// let id = getId();
		// let creationDate = getDate();
		const update = {
			title,
			description: newDescription,
			duration: duration * 1,
			authors: authorsCourse,
			id: courseId,
			token,
		};

		// handleupdate(update);
		// dispatch(addExampleOfCourse(update));
		dispatch(
			updateTheCourse(
				update.title,
				update.description,
				update.duration,
				update.authors,
				update.id,
				update.token
			)
		);
		// dispatch(updateTheCourse(newCourse));
		// onResetForm();
		// onResetForm2();
		// setAuthors([]);
		// setAuthorsCourse([]);

		setTimeout(() => goCourses(), [300]);
	};

	return (
		<>
			<p>
				<Link to='/courses'> {'<- '}Back to courses</Link>
			</p>
			<div className='createCourseContainer'>
				<div>
					<div className='createCourse-title-button'>
						<div className='createCourse-title'>
							<h3>
								Title <small className='requiredElements'> *is required</small>
							</h3>
							<Input
								onSubmit={onFormSubmit}
								placeholder={'Enter title...'}
								inputClass={'title'}
								name={'title'}
								value={title}
								onChange={onInputChange}
							/>
						</div>
						<Button buttonText={'Update course'} onClick={updatingCourse} />
					</div>
					<h3>
						Description
						<small className='requiredElements'> *is required</small>
					</h3>
					<textarea
						className='createCourse-textArea'
						placeholder='Enter description'
						name={'description'}
						value={description}
						onChange={onInputChange}
					></textarea>
				</div>
				<div className='createCourse-author-duration'>
					<div className='blabla'>
						<div className='createCourse-author'>
							<h2>Add author</h2>
							<h3>Author Name</h3>
							<Input
								onSubmit={onFormSubmit}
								placeholder={'Enter author name...'}
								inputClass={'author'}
								name={'name'}
								value={name}
								onChange={onInputChange2}
								type={'text'}
								onKeyPress={onKeyPress}
							/>
							<Button buttonText={'Create Author'} onClick={createAuthor} />
						</div>
						<div className='createCourse-authorList'>
							<h2>Authors</h2>
							{authors.map((author) => (
								<div key={author.id} className='author-button'>
									<h3>{author.name}</h3>
									<Button
										buttonText={'Add author'}
										onClick={() => addAuthor(author.id, author.name)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='blabla'>
						<div className='createCourse-author'>
							<h2>Duration</h2>
							<h3>
								Duration <br />
								<small className='requiredElements'>*is required</small>
							</h3>
							<Input
								onSubmit={onFormSubmit}
								placeholder={'Enter duration in minutes...'}
								inputClass={'author'}
								name={'duration'}
								value={duration}
								onChange={onInputChange}
								type={'number'}
							/>
							<p>
								Duration: <strong>{getTime(duration)}</strong>
							</p>
						</div>
						<div className='authorsSelected'>
							<h2>
								Course authors <br />
								<small className='requiredElements'> *is required</small>
							</h2>
							{authorsCourse.length === 0 ? (
								<h3>Author list is empty</h3>
							) : (
								<div className='authors-choice'>
									{authorsCourse?.map((authorId) => (
										<div key={authorId} className='authorChoice-button'>
											<h3>
												{
													allyAuthors.find((person) => person.id === authorId)
														?.name
												}
											</h3>
											<Button
												buttonText={'Delete author'}
												onClick={() => deleteAuthor(authorId)}
											/>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
