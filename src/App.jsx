import React from 'react';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import PopularHomes from './components/PopularHomes/PopularHomes.jsx';
import WhatWeDO from './components/WeDo/WhatWeDo.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <LandingPage />
      <PopularHomes />
      <WhatWeDO />
      <AboutUs />
    </div>
  );
};

export default App;