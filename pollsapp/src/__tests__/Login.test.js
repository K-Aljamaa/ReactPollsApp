// src/__tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk'; // Note the change here
import Login from '../components/Login';

// Create mock store with middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo'
        }
      }
    });
  });

  test('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('handles user selection and login', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'sarahedo' } });
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'SET_AUTH_USER',
      userId: 'sarahedo'
    });
  });
});