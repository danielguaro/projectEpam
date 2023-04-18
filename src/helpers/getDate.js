export const getDate = () => {
	const today = new Date();
	const day = today.getDate().toString().padStart(2, '0'); // Agrega un 0 si el día es menor a 10
	const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Agrega un 0 si el mes es menor a 10
	const year = today.getFullYear();
	const currentDate = `${day}.${month}.${year}`;
	return currentDate;
};
