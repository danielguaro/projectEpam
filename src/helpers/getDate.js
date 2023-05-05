export const getDate = () => {
	const today = new Date();
	const day = today.getDate().toString().padStart(2, '0'); // add a 0 if the day is less than 10
	const month = (today.getMonth() + 1).toString().padStart(2, '0'); // add a 0 if the month is less than 10
	const year = today.getFullYear();
	const currentDate = `${day}/${month}/${year}`;
	return currentDate;
};
