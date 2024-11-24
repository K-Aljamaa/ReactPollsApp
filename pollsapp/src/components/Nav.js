import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unsetAuthUser } from '../store/reducers/authUser';

function Nav() {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authUser);
  const users = useSelector(state => state.users);
  
  const handleLogout = () => {
    dispatch(unsetAuthUser());
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        {authUser && (
          <li>
            Welcome, {users[authUser].name}
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;