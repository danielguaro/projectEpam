import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react'; // de youtube
import { persistStore } from 'redux-persist'; // de youtube

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<PersistGate persistor={persistor}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</PersistGate>
	</React.StrictMode>
);
