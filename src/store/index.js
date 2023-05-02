import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import storage from 'redux-persist/lib/storage'; // Let store any value
import { combineReducers } from '@reduxjs/toolkit'; // to have multiply reducers
import { persistReducer } from 'redux-persist';
// thunk is in charge of connecting redux-persist with redux-toolkit
import thunk from 'redux-thunk';
import { coursesSlice } from './courses';
import { authorsSlice } from './authors';
// to store the values
const persistConfig = {
	key: 'root', // how i want to store it locally
	storage, // Controller or library that is responsible for storing the information
	whitelist: ['userState', 'coursesState', 'authorsState'], // array of reducers that i would like to save
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
	middleware: [thunk],
});
