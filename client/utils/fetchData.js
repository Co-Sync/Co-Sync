import { useGetUserProjectsQuery } from './userApi';
import { useDispatch } from 'react-redux';
import { setUserState, setError } from '../slices/userSlice.js';

const fetchData = () => {
  const { data, isError, isSuccess, error } = useGetUserProjectsQuery(); // initial query to get user data
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('isAuth');
  console.log('isAuth: ', isAuth);
  if (isError) {
    dispatch(setError(error));
  }
  if (isAuth && isSuccess && data) {
    const userData = data;
    const projects = {}
    for (const project of userData.projects) {
      projects[project.projectName] = project;
    }
    const transformedData = {
      projects,
      numOfProjects: userData.projects.length,
      username: userData.username,
    };
    dispatch(setUserState(transformedData)); // and set the user state in redux store
  }
}

export default fetchData;