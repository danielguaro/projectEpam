// To login
export const postDataLogin = async (userEmail, userPassword) => {
	const newUser = { email: userEmail, password: userPassword };
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();

	if (result.successful === false) {
		alert('Wrong email or password, also be sure you are registered');
		return {
			isAuth: false,
		};
	}

	const token = result.result;
	const { name, email } = result.user;

	const checkingUserRole = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});

	const checkedUserRole = await checkingUserRole.json();
	const role = checkedUserRole.result.role;
	if (checkedUserRole.successful === false) {
		return {
			isAuth: true,
			name,
			email,
			token,
			role,
		};
	}

	return {
		isAuth: true,
		name,
		email,
		token,
		role,
	};
};

// Logout
export const logoutMethod = async (userToken) => {
	const response = await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${userToken}`,
		},
	});
	const status = response.status;
	if (status === 200) {
		return {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: '',
			message: '',
		};
	}
};
