import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Map from "./components/Map/Map";
import { UserLayout } from "./layout/Userlayout";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route path="" element={<Home />}></Route>
                    <Route path="Map" element={<Map />}></Route>
                    <Route path="about" element={<About />}></Route>
                </Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
