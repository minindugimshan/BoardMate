
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Navigationbar from './components/Navigationbar/Navigationbar'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import PropertyDetails from './components/Property/PropertyDetails'
import SearchResults from './components/Property/SearchResults'
import StudentProfile from './components/Profile/StudentProfile';

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Map' element={<Map />} />
        <Route path='/about' element={<About />} />
        <Route path='/property/:id' element={<PropertyDetails />} /> 
        <Route path='/search' element={<SearchResults />} />
        <Route path='/profile' element={<StudentProfile />} /> 
      </Routes>
      <Footer />
    </>
  )
}

export default App