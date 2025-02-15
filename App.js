import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import DailyTrades from './components/DailyTrades';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {!isLoggedIn ? (
        <Login onLogin={setIsLoggedIn} />
      ) : (
        <div>
          <nav>
            <Link to="/daily">Daily Trades</Link>
            <Link to="/weekly">Weekly Trades</Link>
          </nav>

          <Route path="/daily" component={DailyTrades} />
          {/* Add weekly and monthly components similarly */}
        </div>
      )}
    </Router>
  );
}