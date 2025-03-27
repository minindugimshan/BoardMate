import { useNavigate } from "react-router-dom";
import "./Navigationbar.css";

function Navigationbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="w-[80rem] flex justify-between items-center">
        <div className="logo">
          <img src="/bmlogo.png" alt="BoardMate Logo" className="logo-image" />
        </div>
        <div className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>
            Home
          </a>
          <a href="#" onClick={() => navigate("/map")}>
            Map
          </a>
          <a href="#" onClick={() => navigate("/chats")}>
            Chat
          </a>
          <a href="#" onClick={() => navigate("/support")}>
            Support
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigationbar;