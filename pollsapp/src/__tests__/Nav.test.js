// src/__tests__/Nav.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Nav from '../components/Nav';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Nav Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo'
        }
      }
    });
  });

  test('displays all expected navigation links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('New Poll')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });
});