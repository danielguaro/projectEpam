import { useState } from 'react';

export const useForm = (initialForm = {}) => {
	const [formState, setFormState] = useState(initialForm);

	const onInputChange = ({ target }) => {
		// console.log(target.value);
		// console.log(target.name);
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const updateFormState = (newFormState) => {
		setFormState({
			...formState,
			...newFormState,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		updateFormState,
	};
};
