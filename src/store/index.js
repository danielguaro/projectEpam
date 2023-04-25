import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import storage from 'redux-persist/lib/storage'; // Permite almacenar cualquier valor
import { combineReducers } from '@reduxjs/toolkit'; // Para tener multiples reducers
import { persistReducer } from 'redux-persist';
// thunk es el encargado de conectar redux-persist con redux-toolkit
import thunk from 'redux-thunk';
import { coursesSlice } from './courses';
import { authorsSlice } from './authors';
// Para almacenar los valores
const persistConfig = {
	key: 'root', // COmo quiero que se almacene de manera local
	storage, //Controlador o libreria que se encarga de almacenar la información
	whitelist: ['userState', 'coursesState', 'authorsState'], // array de reducers que quiero guardar
};

const rootReducer = combineReducers({
	userState: userSlice.reducer,
	coursesState: coursesSlice.reducer,
	authorsState: authorsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		// user: userSlice.reducer,
		user: persistedReducer,
		courses: persistedReducer,
		authors: persistedReducer,
	},
	// Esto es nuevo
	middleware: [thunk],
});
