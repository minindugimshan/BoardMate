// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PropertyListing from './components/PropertyListing';
// import Layout from './components/Layout';

// // Pages
// const Map = () => <div>Map View</div>;
// const Chat = () => <div>Chat Interface</div>;
// const Profile = () => <div>User Profile</div>;

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<PropertyListing />} />
//           <Route path="map" element={<Map />} />
//           <Route path="chat" element={<Chat />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Navigationbar from './components/Navigationbar/Navigationbar'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
// import PropertyListing from './components/Property/PropertyListing'
import PropertyDetails from './components/Property/PropertyDetails'
import SearchResults from './components/Property/SearchResults'

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Map' element={<Map />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/properties' element={<PropertyListing />} /> */}
        <Route path='/properties/:id' element={<PropertyDetails />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App