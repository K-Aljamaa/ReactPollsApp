import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../store/reducers/questions';

function NewPoll() {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(state => state.authUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(handleAddQuestion(optionOneText, optionTwoText, authUser))
      .then(() => {
        // Reset form and redirect to dashboard
        setOptionOneText('');
        setOptionTwoText('');
        navigate('/');
      });
  };

  return (
    <div>
      <h2>Create New Poll</h2>
      <h3>Would you rather...</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="optionOne">Option One:</label>
          <input
            id="optionOne"
            type="text"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Enter first option"
            required
          />
        </div>
        
        <div>
          <label htmlFor="optionTwo">Option Two:</label>
          <input
            id="optionTwo"
            type="text"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Enter second option"
            required
          />
        </div>

        <button 
          type="submit"
          disabled={!optionOneText || !optionTwoText}
        >
          Create Poll
        </button>
      </form>
    </div>
  );
}

export default NewPoll;