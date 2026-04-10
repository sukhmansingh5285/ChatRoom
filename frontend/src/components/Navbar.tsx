import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import * as userApi from "../api/userApi";
import { getErrorMessage } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await userApi.logout();
      toast.success(data.message || "Logged out");
      setIsAuthorized(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err, "Logout failed"));
    }
  };

  // Don't show navbar if user is not logged in
  if (!isAuthorized) return null;

  return (
    <nav className="bg-gray-900 text-white shadow-md relative z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/rooms" className="text-xl font-bold">
          ChatRoom
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <GiHamburgerMenu />
        </button>

        {/* Nav links */}
        <ul
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-gray-900 gap-4 p-4 md:p-0 items-center`}
        >
          <li>
            <Link to="/rooms" onClick={() => setMenuOpen(false)}>
              All Rooms
            </Link>
          </li>
          <li className="text-sm text-gray-400">Hi, {user?.name}</li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-white text-gray-900 px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
