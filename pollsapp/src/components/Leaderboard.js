import React from 'react';
import { useSelector } from 'react-redux';

function Leaderboard() {
  const users = useSelector(state => state.users);

  // Calculate scores and create sorted leaderboard
  const leaderboardData = Object.values(users)
    .map(user => ({
      ...user,
      answeredCount: Object.keys(user.answers).length,
      createdCount: user.questions.length,
      totalScore: Object.keys(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 bg-gray-50 p-4 border-b text-sm font-medium text-gray-500">
          <div className="col-span-2">User</div>
          <div className="text-center">Answered</div>
          <div className="text-center">Created</div>
          <div className="text-center">Total Score</div>
          <div className="text-center">Rank</div>
        </div>

        {/* User Rows */}
        {leaderboardData.map((user, index) => (
          <div 
            key={user.id}
            className={`grid grid-cols-6 p-4 items-center border-b ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {/* User Info */}
            <div className="col-span-2 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                {user.avatarURL ? (
                  <img 
                    src={user.avatarURL} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="text-blue-600 font-medium">
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-500">@{user.id}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                {user.answeredCount}
              </span>
            </div>
            
            <div className="text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800">
                {user.createdCount}
              </span>
            </div>

            <div className="text-center font-medium text-gray-800">
              {user.totalScore}
            </div>

            {/* Rank Medal */}
            <div className="text-center">
              {index === 0 && (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-800">
                  1st
                </span>
              )}
              {index === 1 && (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800">
                  2nd
                </span>
              )}
              {index === 2 && (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800">
                  3rd
                </span>
              )}
              {index > 2 && (
                <span className="text-gray-500">
                  {index + 1}th
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;