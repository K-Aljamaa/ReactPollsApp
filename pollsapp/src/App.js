import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/reducers/users';
import { fetchQuestions } from './store/reducers/questions';
import Nav from './components/Nav';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PollDetail from './components/PollDetail';
import NewPoll from './components/NewPoll';
import Leaderboard from "./components/Leaderboard"

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authUser);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!authUser) {
    return <Login />;
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/questions/:id" element={<PollDetail />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;