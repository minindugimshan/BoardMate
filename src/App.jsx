
import { data, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Navigationbar from './components/Navigationbar/Navigationbar'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Support from './components/Support/Support'
import PropertyDetails from './components/Property/PropertyDetails'
import SearchResults from './components/Property/SearchResults'
import Payments from './components/Payments/Payments'
import PaymentSuccess from './components/Payments/PaymentSuccess'
import PaymentCancel from './components/Payments/PaymentCancel'

function App() {

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Map' element={<Map />}></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/Support' element={<Support />} ></Route>
        <Route path='/property/:id' element={<PropertyDetails />} /> 
        <Route path='/search' element={<SearchResults />} />
        <Route path='property/:id/payments' element={<Payments />} />
        <Route path='/payment-success' element={<PaymentSuccess />}></Route>
        <Route path='/payment-cancel' element={<PaymentCancel />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
