import './creaeteCourse.css';

import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../Courses/components/data/data';
import { useEffect, useReducer, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { Courses } from '../Courses/Courses';
import { Input } from '../../common/Input/Input';
import { createAuthorReducer } from '../Courses/components/data/createAuthorReducer';
import { createCourseReducer } from '../Courses/components/data/createCourseReducer';
import { getDate } from '../../helpers/getDate';
import { getId } from '../../helpers/getId';
import { getTime } from '../../helpers/getTime';
import { useForm } from '../../hooks/useForm';

const initialState = mockedCoursesList;
const initialAuthors = mockedAuthorsList;
// const init = () => {
// 	return JSON.parse(localStorage.getItem('courses')) || initialState;
// };
// const initAuthors = () => {
// 	return JSON.parse(localStorage.getItem('authors')) || initialAuthors;
// };

export const CreateCourse = ({ init, initAuthors, clickAdding }) => {
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

	//Para tema del localstorage
	// useEffect(() => {
	// 	if (courses.length > 0) {
	// 		localStorage.setItem('courses', JSON.stringify(courses));
	// 	} else {
	// 		localStorage.setItem('courses', JSON.stringify(initialState));
	// 	}
	// }, [courses]);

	const onCourseUpdate = (course) => {
		const newCourses = [...courses, course];
		localStorage.setItem('courses', JSON.stringify(newCourses));

		// else {
		// 	localStorage.setItem('courses', JSON.stringify(initialState));
		// }
	};

	// useEffect(() => {
	// 	if (allAuthors.length > 0) {
	// 		localStorage.setItem('authors', JSON.stringify(allAuthors));
	// 	} else {
	// 		localStorage.setItem('authors', JSON.stringify(initialAuthors));
	// 	}
	// }, [allAuthors]);

	const onAuthorUpdate = () => {
		if (allAuthors.length > 0) {
			localStorage.setItem('authors', JSON.stringify(allAuthors));
		} else {
			localStorage.setItem('authors', JSON.stringify(initialAuthors));
		}
	};

	console.log(courses);
	console.log(allAuthors);

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
		// setAuthors([...authors, { id: id, name: name }]);
		setAuthors([...authors, { id: id, name: name }]);
		// setAuthorsCourse([...authors, id]);
		const newAuthor = {
			id,
			name,
		};
		console.log(newAuthor);
		handleNewAuthor(newAuthor);
		onResetForm2();
	};

	// adding the author
	const handleNewAuthor = (newAuthor) => {
		const action = {
			type: '[AUTHOR] add author',
			payload: newAuthor,
		};
		dispatch1(action);
	};

	// add author
	const addAuthor = (id, name) => {
		console.log('click to the author');
		console.log(id, authorsCourse, authors);
		// const authorExists = authorsCourse.find((person) => person.name === name);
		const authorExists = authorsCourse.find((personId) => id === personId);
		if (authorExists) {
			alert(`The author ${name} is already on the list`);
			return;
		}
		// setAuthors([...authors, { id: id, name: name }]);
		setAuthors(authors.filter((author) => author.id !== id));
		setAuthorsCourse([...authorsCourse, id]);
	};
	//
	console.log(authors);

	// Deleting author
	const deletAuthor = (authorId) => {
		console.log('delet', authorId);
		console.log(authors);
		// const restAuthors = authors.filter((e) => e.id !== authorId);
		// const restAuthorsCourse = authorsCourse.filter((e) => e.id !== authorId);
		// console.log(restAuthors);
		const newAuthors = [...authors];
		const author = allAuthors.find((person) => person.id === authorId);
		newAuthors.push(author);
		setAuthors(newAuthors);
		setAuthorsCourse(authorsCourse.filter((personId) => personId !== authorId));
		// setAuthorsCourse(restAuthorsCourse);
	};

	// const handleDeletAuthor = (id) => {

	// }

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
		// onNewCourse && onNewCourse(newCourse);
		clickAdding();
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
								inputclas={'title'}
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
								placeholder={'Enter author name...'}
								inputclas={'author'}
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
								placeholder={'Enter duration in minutes...'}
								inputclas={'author'}
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
												buttonText={'Delet author'}
												onClick={() => deletAuthor(authorId)}
											/>
										</div>
									))}
									{/* <h3>{authors?.map((e) => e.name)}</h3>
									<Button buttonText={'Delete author'} /> */}
								</div>
							)}
						</div>
					</div>
				</div>
				{/* <Courses allCourses={courses} /> */}
			</div>
		</>
	);
};
