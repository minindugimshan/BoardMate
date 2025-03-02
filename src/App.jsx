import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navigationbar/Navigationbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import StudentProfile from './components/Profile/StudentProfile';
import LandlordProfile from './components/Profile/LandlordProfile';

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/landlord-profile" element={<LandlordProfile />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/messages" element={<div>Messages Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/properties" element={<div>Properties Page</div>} />
        <Route path="/properties/:id" element={<div>Property Details Page</div>} />
        <Route path="/properties/:id/edit" element={<div>Edit Property Page</div>} />
        <Route path="/properties/new" element={<div>Add New Property Page</div>} />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;