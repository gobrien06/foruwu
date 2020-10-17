import React from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <div className="App">
        <Navigation/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
