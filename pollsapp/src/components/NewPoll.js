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
        setOptionOneText('');
        setOptionTwoText('');
        navigate('/');
      });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create New Poll</h2>
          <p className="text-gray-600 mt-2">Would you rather...</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="optionOne" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Option One
            </label>
            <input
              id="optionOne"
              type="text"
              value={optionOneText}
              onChange={(e) => setOptionOneText(e.target.value)}
              placeholder="Enter first option"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div>
            <label 
              htmlFor="optionTwo" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Option Two
            </label>
            <input
              id="optionTwo"
              type="text"
              value={optionTwoText}
              onChange={(e) => setOptionTwoText(e.target.value)}
              placeholder="Enter second option"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={!optionOneText || !optionTwoText}
              className={`w-full py-3 rounded-md font-medium text-white ${
                optionOneText && optionTwoText
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Create Poll
            </button>
            
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full mt-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPoll;