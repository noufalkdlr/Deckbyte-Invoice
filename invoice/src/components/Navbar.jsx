import { useGoogleAuth } from "../GoogleAuthContext";
import { Link } from "react-router-dom";

import logo from "../assets/DeckbyteLogo.png";

const Navbar = () => {
  const { token, login, logout } = useGoogleAuth();

  return (
    <header className=" flex justify-between items-center h-16 w-full px-4 sm:px-80 border-b bg-white">
      <div>
        <Link to="/">
        <img className="w-36 sm:w-48" src={logo} alt="" />
        </Link>
        
      </div>
      {!token ? (
        <div>
          {" "}
          <button
            className="bg-blue-700 text-white w-24  px-6 py-3 rounded-md hover:bg-blue-800 hover:translate-y-0.5 transition-transform duration-300"
            onClick={() => login()}
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          {" "}
          <button
            className="bg-red-700 text-white w-24 px-6 py-3 rounded-md hover:bg-red-800 hover:translate-y-0.5 transition-transform duration-300"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
