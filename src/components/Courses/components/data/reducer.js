import { mockedCoursesList, mockedAuthorsList } from './data';

// state = initialState
// action = le dice al reducer como quiero que cambie el state, debe ser un objeto, para que no me devuelva error
const myReducer = (state = mockedCoursesList, action = {}) => {
	// Regresar un nuevo estado
	if (action.type === '[COURSE] add course') {
		return [...state, action.payload];
	}

	return state;
};

let example = myReducer();
console.log(example);

// one example
const newCourse = {
	id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
	title: 'Paython',
	description: `Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the
      1500s, when an unknown
      printer took a galley of type and scrambled it to make a type
      specimen book. It has survived
      not only five centuries, but also the leap into electronic
      typesetting, remaining essentially u
      nchanged.`,
	creationDate: '8/3/2021',
	duration: 160,
	authors: [
		'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		'f762978b-61eb-4096-812bebde22838167',
	],
};

const addNewCourseAction = {
	// estandar type
	type: '[COURSE] add course',
	// payload, la acción que va a recibir el nuevo elemento
	payload: newCourse,
};

example = myReducer(example, addNewCourseAction);

console.log({ state: example });
