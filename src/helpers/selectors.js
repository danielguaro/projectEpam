import { useSelector } from 'react-redux';

export const theCourses = (state) => state.courses.coursesState;
export const theAuthors = (state) => state.authors.authorsState;
export const theUser = (state) => state.user.userState;
