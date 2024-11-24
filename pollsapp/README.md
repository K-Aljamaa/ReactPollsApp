# Employee Polls Project

A web application that lets employees create and participate in polls. Built with React and Redux, this project demonstrates the implementation of state management, routing, and user authentication in a React application.

## Features

- User Authentication (Select from existing users)
- Create new polls
- Answer existing polls
- View answered and unanswered polls
- Track poll statistics and votes
- Leaderboard showing user participation
- Responsive design with Tailwind CSS

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Technologies Used

- React 18
- Redux for state management
- React Router v6 for navigation
- Redux Thunk for async actions
- Tailwind CSS for styling
- Jest and React Testing Library for testing

## Project Structure

```
src/
├── components/      # React components
├── store/          # Redux store configuration
│   ├── actions/    # Redux actions
│   └── reducers/   # Redux reducers
├── utils/          # Utility functions and data
└── __tests__/      # Test files
```

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Data operations
- Component rendering
- User interactions
- Redux integration
- Routing functionality

## Features

1. **Authentication**
   - Select user from dropdown
   - View personalized dashboard

2. **Polls**
   - Create new polls
   - Answer existing polls
   - View poll results and statistics

3. **Dashboard**
   - Toggle between answered and unanswered polls
   - Quick access to poll details

4. **Leaderboard**
   - Track user participation
   - View statistics for questions created and answered

## Acknowledgments

- Create React App for the project setup
- Tailwind CSS for styling components
- Testing Library for test utilities