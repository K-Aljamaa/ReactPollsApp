// src/__tests__/Leaderboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Leaderboard from '../components/Leaderboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Leaderboard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          name: 'Sarah Edo',
          answers: { '1': 'optionOne', '2': 'optionTwo' },
          questions: ['3', '4']
        }
      }
    });
  });

  test('displays correct user statistics', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
  });
});