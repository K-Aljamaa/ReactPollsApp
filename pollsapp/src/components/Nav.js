import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unsetAuthUser } from '../store/reducers/authUser';

function Nav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const authUser = useSelector(state => state.authUser);
  const users = useSelector(state => state.users);
  
  const handleLogout = () => {
    dispatch(unsetAuthUser());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/add" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/add') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              New Poll
            </Link>
            <Link 
              to="/leaderboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/leaderboard') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Leaderboard
            </Link>
          </div>
          {authUser && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={users[authUser].avatarURL} 
                  alt={users[authUser].name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700">
                  {users[authUser].name}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;