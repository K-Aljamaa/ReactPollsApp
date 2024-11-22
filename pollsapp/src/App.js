import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './store/reducers/users';
import { fetchQuestions } from './store/reducers/questions';
import Login from './components/Login';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;