import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../store/reducers/authUser';

function Login() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState('');

  const handleLogin = () => {
    if (selectedUser) {
      dispatch(setAuthUser(selectedUser));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Employee Polls
        </h2>
        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="user"
          >
            Select User
          </label>
          <select
            id="user"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a User</option>
            {Object.values(users).map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleLogin}
          disabled={!selectedUser}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            selectedUser 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;