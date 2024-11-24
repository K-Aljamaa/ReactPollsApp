import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PollPreview from './PollPreview';

function Dashboard() {
  const [filter, setFilter] = useState('unanswered'); // 'all', 'answered', 'unanswered'
  const questions = useSelector(state => state.questions);
  const authUser = useSelector(state => state.authUser);
  const users = useSelector(state => state.users);

  if (!authUser) return <div>Please log in</div>;

  const sortedQuestions = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp);

  const filteredQuestions = sortedQuestions.filter(question => {
    const hasAnswered = 
      question.optionOne.votes.includes(authUser) || 
      question.optionTwo.votes.includes(authUser);

    if (filter === 'answered') return hasAnswered;
    if (filter === 'unanswered') return !hasAnswered;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'unanswered'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('unanswered')}
          >
            Unanswered
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'answered'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('answered')}
          >
            Answered
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All Polls
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map(question => (
          <PollPreview 
            key={question.id} 
            question={question} 
            author={users[question.author]}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;