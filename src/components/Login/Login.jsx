import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { UserContext } from '../../context/UserContext';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
	// importing stuff from my userCOntext
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const { email, password, onInputChange, onResetForm } = useForm({
		email: '',
		password: '',
	});

	const onFormSubmit = (e) => {
		e.preventDefault();
	};

	const postData = async (email, password) => {
		const newUser = { email, password };
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		if (result.successful === false) {
			alert(result.result);
			return;
		}
		// console.log(result.result);
		// console.log(result.user.name);
		setUser(result.user);
		// console.log(result.successful);
		// console.log(result.errors[0]);
		// console.log(result);
		localStorage.setItem('token', result.result);
		localStorage.setItem('name', result.user.name);
		onCourses();
		return result;
	};

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');
	// 	if (token) {
	// 		navigate('/courses');
	// 	}
	// }, [navigate]);

	const onCourses = () => {
		navigate('/courses', {
			replace: true,
		});
	};
	const sendLogin = () => {
		postData(email, password);
		onResetForm();
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
