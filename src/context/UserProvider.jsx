import { UserContext } from './UserContext';
import { useState } from 'react';

// const user = {
// 	name: 'Daniel',
// 	email: 'blabla@gmail.com',
// };

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});
	return (
		// En el value se manda un objeto
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
