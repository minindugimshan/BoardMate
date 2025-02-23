import React from 'react';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import PopularHomes from './components/PopularHomes/PopularHomes.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <LandingPage />
      <PopularHomes />
    </div>
  );
};

export default App;