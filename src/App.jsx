
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Navigationbar from './components/Navigationbar/Navigationbar'
import Footer from './components/Footer/Footer'
import About from './components/About/About'

function App() {

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path='/about' element={<About />} ></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
