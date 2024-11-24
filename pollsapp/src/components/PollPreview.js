import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PollPreview({ question, author }) {
  const authUser = useSelector(state => state.authUser);
  const hasAnswered = 
    question.optionOne.votes.includes(authUser) || 
    question.optionTwo.votes.includes(authUser);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={author.avatarURL} 
          alt={author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Poll by {author.name}
          </h3>
          <span className="text-sm text-gray-500">
            {new Date(question.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <p className="text-gray-600">Would you rather...</p>
        <p className="text-gray-800">{question.optionOne.text}</p>
        <p className="text-gray-600 text-center">or</p>
        <p className="text-gray-800">{question.optionTwo.text}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-sm ${
          hasAnswered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {hasAnswered ? 'Answered' : 'Not answered'}
        </span>
        <Link
          to={`/questions/${question.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
        >
          View Poll
        </Link>
      </div>
    </div>
  );
}

export default PollPreview;