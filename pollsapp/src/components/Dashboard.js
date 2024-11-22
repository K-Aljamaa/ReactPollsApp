import React from 'react';
import { useSelector } from 'react-redux';
import PollPreview from './PollPreview';

function Dashboard() {
  const questions = useSelector(state => state.questions);
  const authUser = useSelector(state => state.authUser);
  const users = useSelector(state => state.users);

  if (!authUser) return <div>Please log in</div>;

  // Sort questions by timestamp
  const sortedQuestions = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div>
      <h2>Dashboard</h2>
      {sortedQuestions.map(question => (
        <PollPreview 
          key={question.id} 
          question={question} 
          author={users[question.author]}
        />
      ))}
    </div>
  );
}

export default Dashboard;