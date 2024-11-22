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
  const author = users[question.author];

  const [selectedOption, setSelectedOption] = useState(null);

  if (!question) {
    return <div>Poll not found</div>;
  }

  const hasAnswered = 
    question.optionOne.votes.includes(authUser) || 
    question.optionTwo.votes.includes(authUser);

  const handleSubmit = () => {
    if (selectedOption) {
      dispatch(handleAnswerQuestion(authUser, id, selectedOption));
    }
  };

  const calculatePercentage = (votes, total) => {
    return ((votes.length / total) * 100).toFixed(2);
  };

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

  return (
    <div>
      <h2>Poll by {author.name}</h2>
      <h3>Would you rather...</h3>
      
      {!hasAnswered ? (
        <div>
          <div>
            <input 
              type="radio" 
              id="optionOne" 
              name="poll" 
              value="optionOne"
              checked={selectedOption === 'optionOne'}
              onChange={() => setSelectedOption('optionOne')}
            />
            <label htmlFor="optionOne">{question.optionOne.text}</label>
          </div>
          <div>
            <input 
              type="radio" 
              id="optionTwo" 
              name="poll" 
              value="optionTwo"
              checked={selectedOption === 'optionTwo'}
              onChange={() => setSelectedOption('optionTwo')}
            />
            <label htmlFor="optionTwo">{question.optionTwo.text}</label>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <div>
            <p>{question.optionOne.text}</p>
            <p>
              Votes: {question.optionOne.votes.length} 
              ({calculatePercentage(question.optionOne.votes, totalVotes)}%)
            </p>
            {question.optionOne.votes.includes(authUser) && <strong>Your Vote</strong>}
          </div>
          <div>
            <p>{question.optionTwo.text}</p>
            <p>
              Votes: {question.optionTwo.votes.length} 
              ({calculatePercentage(question.optionTwo.votes, totalVotes)}%)
            </p>
            {question.optionTwo.votes.includes(authUser) && <strong>Your Vote</strong>}
          </div>
        </div>
      )}
      
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
}

export default PollDetail;