import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleAnswerQuestion } from '../store/reducers/questions';

function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const question = useSelector(state => state.questions[id]);
  const authUser = useSelector(state => state.authUser);
  const users = useSelector(state => state.users);
  
  const [selectedOption, setSelectedOption] = useState(null);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Poll not found</div>
      </div>
    );
  }

  const author = users[question.author];
  const hasAnswered = 
    question.optionOne.votes.includes(authUser) || 
    question.optionTwo.votes.includes(authUser);

  const handleSubmit = () => {
    if (selectedOption) {
      dispatch(handleAnswerQuestion(authUser, id, selectedOption));
    }
  };

  const calculatePercentage = (votes, total) => {
    return ((votes.length / total) * 100).toFixed(1);
  };

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img 
              src={author.avatarURL} 
              alt={author.name}
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Poll by {author.name}</h2>
              <p className="text-sm text-gray-500">
                Posted on {new Date(question.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-center text-lg">Would you rather...</p>
        </div>

        {!hasAnswered ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block p-4 rounded-lg border-2 cursor-pointer hover:border-blue-500 transition-colors">
                <input 
                  type="radio" 
                  name="poll"
                  className="mr-3"
                  checked={selectedOption === 'optionOne'}
                  onChange={() => setSelectedOption('optionOne')}
                />
                <span className="text-gray-800">{question.optionOne.text}</span>
              </label>

              <label className="block p-4 rounded-lg border-2 cursor-pointer hover:border-blue-500 transition-colors">
                <input 
                  type="radio" 
                  name="poll"
                  className="mr-3"
                  checked={selectedOption === 'optionTwo'}
                  onChange={() => setSelectedOption('optionTwo')}
                />
                <span className="text-gray-800">{question.optionTwo.text}</span>
              </label>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`w-full py-3 rounded-md font-medium text-white ${
                selectedOption 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                question.optionOne.votes.includes(authUser)
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50'
              }`}>
                <p className="text-gray-800 mb-2 font-medium">{question.optionOne.text}</p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${calculatePercentage(question.optionOne.votes, totalVotes)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {question.optionOne.votes.length} votes 
                    ({calculatePercentage(question.optionOne.votes, totalVotes)}%)
                  </span>
                  {question.optionOne.votes.includes(authUser) && 
                    <span className="text-blue-600 font-medium flex items-center">
                      Your vote
                    </span>
                  }
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                question.optionTwo.votes.includes(authUser)
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50'
              }`}>
                <p className="text-gray-800 mb-2 font-medium">{question.optionTwo.text}</p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${calculatePercentage(question.optionTwo.votes, totalVotes)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {question.optionTwo.votes.length} votes 
                    ({calculatePercentage(question.optionTwo.votes, totalVotes)}%)
                  </span>
                  {question.optionTwo.votes.includes(authUser) && 
                    <span className="text-blue-600 font-medium flex items-center">
                      Your vote
                    </span>
                  }
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-md">
              Total votes: {totalVotes}
            </div>
          </div>
        )}

        <button 
          onClick={() => navigate('/')}
          className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PollDetail;