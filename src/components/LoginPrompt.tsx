// React is used implicitly by JSX
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Building2 } from "lucide-react";

const LoginPrompt = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Login Required
      </h2>
      <p className="text-gray-600 mb-6">
        Please login to your clinic account to manage inventory or register your
        clinic if you haven't already.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
        >
          <LogIn className="h-5 w-5" />
          <span>Login</span>
        </Link>
        <Link
          to="/register-clinic"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Register Clinic</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPrompt;
