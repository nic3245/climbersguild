import { FC } from 'react';
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Climber’s Guild! 🧗</h1>
        <p>A community for climbers to share and explore gym routes.</p>
        <div className="features">
          <h2>Features</h2>
          <ul>
            <li>Browse climbs posted by gyms</li>
            <li>Share climbing videos</li>
            <li>Comment on routes</li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default App;