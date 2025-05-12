import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Package,
  BarChart3,
  Users,
  LogOut,
  LogIn,
  UserPlus,
  Map,
} from "lucide-react";
import authService from "../services/auth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const hospital = authService.getHospital();
        setHospitalName(hospital?.name || "");
      }
    };

    checkAuth();
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-teal-600">
                VitalConnect
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/inventory"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
            >
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </div>
            </Link>
            <Link
              to="/analytics"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </div>
            </Link>
            <Link
              to="/nearby-hospitals"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
            >
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                <span>Nearby Hospitals</span>
              </div>
            </Link>
            <Link
              to="/network"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Network</span>
              </div>
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center ml-4">
                <span className="text-gray-700 mr-4">{hospitalName}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register-clinic"
                  className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-teal-50 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/inventory"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </div>
            </Link>
            <Link
              to="/analytics"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </div>
            </Link>
            <Link
              to="/nearby-hospitals"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                <span>Nearby Hospitals</span>
              </div>
            </Link>
            <Link
              to="/network"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Network</span>
              </div>
            </Link>

            {isLoggedIn ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-3 py-2 text-gray-700">{hospitalName}</div>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 mt-2 flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register-clinic"
                  className="block px-3 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
