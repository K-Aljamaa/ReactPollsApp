import React from 'react';
import { Link } from 'react-router-dom';

function PollPreview({ question, author }) {
  return (
    <div>
      <h3>Poll by {author.name}</h3>
      <p>Would you rather:</p>
      <p>{question.optionOne.text}</p>
      <p>OR</p>
      <p>{question.optionTwo.text}</p>
      <Link to={`/questions/${question.id}`}>
        View Poll
      </Link>
    </div>
  );
}

export default PollPreview;