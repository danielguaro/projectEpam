import './creaeteCourse.css';

import {
	createAuthorReducer,
	createCourseReducer,
} from '../Courses/components/data/';
import { getDate, getId, getTime } from '../../helpers/';
import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../Courses/components/data/data';
import { useEffect, useReducer, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const initialState = mockedCoursesList;
const initialAuthors = mockedAuthorsList;

export const CreateCourse = ({ init, initAuthors }) => {
	const [courses, dispatch] = useReducer(
		createCourseReducer,
		initialState,
		init
	);
	const [allAuthors, dispatch1] = useReducer(
		createAuthorReducer,
		initialAuthors,
		initAuthors
	);

	const onCourseUpdate = (course) => {
		const newCourses = [...courses, course];
		localStorage.setItem('courses', JSON.stringify(newCourses));
	};

	const onAuthorUpdate = () => {
		if (allAuthors.length > 0) {
			localStorage.setItem('authors', JSON.stringify(allAuthors));
		} else {
			localStorage.setItem('authors', JSON.stringify(initialAuthors));
		}
	};

	const navigate = useNavigate();
	const goCourses = () => {
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
		title: '',
		description: '',
		duration: '',
	});

	const [authors, setAuthors] = useState([]);
	const [authorsCourse, setAuthorsCourse] = useState([]);

	useEffect(() => {
		setAuthors([...allAuthors]);
	}, []);

	const onFormSubmit = (e) => {
		e.preventDefault();
	};

	const createAuthor = () => {
		if (name.length <= 1) return;
		const authorExists = allAuthors.find((person) => person.name === name);
		if (authorExists) {
			alert(`The author ${name} is already on the list`);
			return;
		}
		let id = getId();
		setAuthors([...authors, { id: id, name: name }]);

		const newAuthor = {
			id,
			name,
		};
		handleNewAuthor(newAuthor);
		onResetForm2();
	};

	// adding the author to all authors
	const handleNewAuthor = (newAuthor) => {
		const action = {
			type: '[AUTHOR] add author',
			payload: newAuthor,
		};
		dispatch1(action);
	};

	// add author
	const addAuthor = (id, name) => {
		const authorExists = authorsCourse.find((personId) => id === personId);
		if (authorExists) {
			alert(`The author ${name} is already on the list`);
			return;
		}

		setAuthors(authors.filter((author) => author.id !== id));
		setAuthorsCourse([...authorsCourse, id]);
	};
	//

	// Deleting author
	const deleteAuthor = (authorId) => {
		const newAuthors = [...authors];
		const author = allAuthors.find((person) => person.id === authorId);
		newAuthors.push(author);
		setAuthors(newAuthors);
		setAuthorsCourse(authorsCourse.filter((personId) => personId !== authorId));
	};

	// adding the course
	const handleNewCourse = (course) => {
		const action = {
			type: '[COURSE] add course',
			payload: course,
		};
		dispatch(action);
		onCourseUpdate(course);
	};
	//

	const createCourse = () => {
		if (title.length <= 1) {
			alert('please write a title');
			return;
		}
		if (description.length <= 2) {
			alert('please write a description');
			return;
		}
		if (duration.length <= 1) {
			alert('please write the time');
			return;
		}
		let id = getId();
		let creationDate = getDate();
		const newCourse = {
			id,
			title,
			description,
			creationDate,
			duration: duration * 1,
			authors: authorsCourse,
		};

		handleNewCourse(newCourse);
		onResetForm();
		onResetForm2();
		setAuthors([]);
		setAuthorsCourse([]);
		onAuthorUpdate();
		goCourses();
	};

	return (
		<>
			<div className='createCourseContainer'>
				<div>
					<div className='createCourse-title-button'>
						<div className='createCourse-title'>
							<h3>title</h3>
							<Input
								onSubmit={onFormSubmit}
								placeholder={'Enter title...'}
								inputClass={'title'}
								name={'title'}
								value={title}
								onChange={onInputChange}
							/>
						</div>
						<Button buttonText={'Create course'} onClick={createCourse} />
					</div>
					<h3>Description</h3>
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
							<h3>Author name</h3>
							<Input
								onSubmit={onFormSubmit}
								placeholder={'Enter author name...'}
								inputClass={'author'}
								name={'name'}
								value={name}
								onChange={onInputChange2}
							/>
							<Button buttonText={'Create author'} onClick={createAuthor} />
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
							<h3>Duration</h3>
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
							<h2>Course authors </h2>
							{authorsCourse.length === 0 ? (
								<h3>Author list is empty</h3>
							) : (
								<div className='authors-choice'>
									{authorsCourse?.map((authorId) => (
										<div key={authorId} className='authorChoice-button'>
											<h3>
												{
													allAuthors.find((person) => person.id === authorId)
														.name
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
