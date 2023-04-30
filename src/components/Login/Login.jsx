import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { showAllAuthors } from '../../store/authors';
import { showAllCourses } from '../../store/courses';
import { startLoginWithEmailPassword } from '../../store/user';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email, password, onInputChange, onResetForm } = useForm({
		email: '',
		password: '',
	});

	const onFormSubmit = (e) => {
		e.preventDefault();
	};

	const onCourses = () => {
		navigate('/courses', {
			replace: true,
		});
	};
	const sendLogin = () => {
		dispatch(startLoginWithEmailPassword(email, password));
		dispatch(showAllCourses());
		dispatch(showAllAuthors());
		setTimeout(() => onCourses(), [500]);
	};

	return (
		<>
			<main className='registrationContainer'>
				<h1>Login</h1>
				<div className='registrationElements'>
					<h3>Email</h3>
					<Input
						onSubmit={onFormSubmit}
						placeholder={'Enter email'}
						type={'email'}
						inputClass={'inputClass'}
						name={'email'}
						value={email}
						onChange={onInputChange}
					/>
					<h3>Password</h3>
					<Input
						onSubmit={onFormSubmit}
						placeholder={'Enter password'}
						type={'password'}
						name={'password'}
						value={password}
						onChange={onInputChange}
					/>
					<Button buttonText={'Login'} onClick={sendLogin} type='submit' />
					<p>
						if you not have an account you can{' '}
						<Link to='/registration'> Registration</Link>
					</p>
				</div>
			</main>
		</>
	);
};
