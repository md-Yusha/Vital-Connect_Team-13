// React is used implicitly by JSX
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Inventory from "./pages/Inventory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RegisterClinic from "./pages/RegisterClinicNew";
import Login from "./pages/Login";
import NearbyHospitals from "./pages/NearbyHospitals";

function App() {
  // Check if the current path is /admin or starts with /admin/
  const isAdminPath =
    window.location.pathname === "/admin" ||
    window.location.pathname.startsWith("/admin/");

  // If it's an admin path, don't render the React app
  if (isAdminPath) {
    // This will effectively do nothing and let the proxy handle the request
    window.location.href = window.location.pathname;
    return null;
  }

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register-clinic" element={<RegisterClinic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
