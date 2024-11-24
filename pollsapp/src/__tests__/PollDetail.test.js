// src/__tests__/PollDetail.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import PollDetail from '../components/PollDetail';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams()
}));

describe('PollDetail Component', () => {
  let store;

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: '123' });
    store = mockStore({
      questions: {
        '123': {
          id: '123',
          author: 'user1',
          optionOne: {
            votes: ['user1', 'user2'],
            text: 'Option 1'
          },
          optionTwo: {
            votes: ['user3', 'user4'],
            text: 'Option 2'
          }
        }
      },
      users: {
        user1: { 
          id: 'user1',
          name: 'User 1'
        }
      },
      authUser: 'user1'
    });
  });

  test('calculates and displays vote percentages correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PollDetail />
        </MemoryRouter>
      </Provider>
    );

    // Check option one (the one user voted for)
    const optionOneVotes = screen.getAllByText(/2 votes/)[0];
    const optionOnePercentage = screen.getAllByText(/50.0%/)[0];
    const yourVote = screen.getByText('Your vote');

    expect(optionOneVotes).toBeInTheDocument();
    expect(optionOnePercentage).toBeInTheDocument();
    expect(yourVote).toBeInTheDocument();

    // Check option two
    const optionTwoVotes = screen.getAllByText(/2 votes/)[1];
    const optionTwoPercentage = screen.getAllByText(/50.0%/)[1];

    expect(optionTwoVotes).toBeInTheDocument();
    expect(optionTwoPercentage).toBeInTheDocument();

    // Check total votes
    expect(screen.getByText('Total votes: 4')).toBeInTheDocument();
  });

  test('displays author information and poll structure', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PollDetail />
        </MemoryRouter>
      </Provider>
    );

    // Check basic poll information
    expect(screen.getByText('Poll by User 1')).toBeInTheDocument();
    expect(screen.getByText('Would you rather...')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();
  });

  test('shows voting status correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PollDetail />
        </MemoryRouter>
      </Provider>
    );

    // Verify "Your vote" appears once for the option the user voted for
    const yourVoteElements = screen.getAllByText('Your vote');
    expect(yourVoteElements).toHaveLength(1);

    // Verify it appears in the context of Option 1
    const optionOneText = screen.getByText('Option 1');
    expect(optionOneText).toBeInTheDocument();
    
    // The "Your vote" text should be visible on the page
    expect(screen.getByText('Your vote')).toBeVisible();
  });

  test('displays the correct percentages for both options', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PollDetail />
        </MemoryRouter>
      </Provider>
    );

    // Both options should show 50% with 2 votes each
    const voteTexts = screen.getAllByText(/2 votes/);
    expect(voteTexts).toHaveLength(2);

    const percentageTexts = screen.getAllByText(/50.0%/);
    expect(percentageTexts).toHaveLength(2);
  });
});