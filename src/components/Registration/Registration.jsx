import './registration.css';

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { useForm } from '../../hooks/useForm';

export const Registration = () => {
	const navigate = useNavigate();

	const { name, password, email, onInputChange, onResetForm } = useForm({
		name: '',
		password: '',
		email: '',
	});
	const onLogin = () => {
		navigate('/login');
	};

	const postData = async (name, password, email) => {
		const newUser = { name, password, email };
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		if (result.successful === false) {
			alert(result.errors[0]);
			return;
		}
		onLogin();
		return result;
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

	const validateEmail = (email) => {
		if (!email.includes('@')) {
			return false;
		}
		if (email.indexOf('@') < 2) {
			return false;
		}
	};

	const validatePassword = (password) => {
		if (password.length < 6) {
			return false;
		}
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
	};

	const sendRegistration = () => {
		if (name.trim() === '') {
			alert('write a name ');
			return;
		}
		if (validateEmail(email) === false) {
			alert('write a propertly email "example@gmail.com"');
			return;
		}
		if (validatePassword(password) === false) {
			alert('write at least 6 characters ');
			return;
		}
		postData(name, password, email);
		onResetForm();
	};

	return (
		<>
			<main className='registrationContainer'>
				<h1>Registration</h1>
				<div className='registrationElements'>
					<h3>Name</h3>
					<Input
						placeholder={'Enter name'}
						onSubmit={onFormSubmit}
						name={'name'}
						value={name}
						onChange={onInputChange}
						onKeyPress={onKeyPress}
					/>
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
						placeholder={'Enter password'}
						type={'password'}
						onSubmit={onFormSubmit}
						name={'password'}
						value={password}
						onChange={onInputChange}
					/>
					<Button
						buttonText={'Registration'}
						onClick={sendRegistration}
						type='submit'
					/>
					<p>
						if you have an account you can <Link to='/login'>Login</Link>
					</p>
				</div>
			</main>
		</>
	);
};
