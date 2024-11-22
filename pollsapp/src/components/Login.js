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
    <div>
      <h2>Login</h2>
      <select 
        value={selectedUser} 
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a User</option>
        {Object.keys(users).map(userId => (
          <option key={userId} value={userId}>
            {users[userId].name}
          </option>
        ))}
      </select>
      <button onClick={handleLogin} disabled={!selectedUser}>
        Login
      </button>
    </div>
  );
}

export default Login;