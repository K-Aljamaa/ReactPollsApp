import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/reducers/users';
import { fetchQuestions } from './store/reducers/questions';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PollDetail from './components/PollDetail';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authUser);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {!authUser ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/questions/:id" element={<PollDetail />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;