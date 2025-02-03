import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyListing from './components/PropertyListing';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyListing />} />
      </Routes>
    </Router>
  );
}

export default App;

