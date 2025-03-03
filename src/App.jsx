
import { data, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Navigationbar from './components/Navigationbar/Navigationbar'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Support from './components/Support/Support'

function App() {

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Map' element={<Map />}></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/Support' element={<Support />} ></Route>
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
