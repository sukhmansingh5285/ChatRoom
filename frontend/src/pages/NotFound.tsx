import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <Link
        to="/rooms"
        className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Go to Rooms
      </Link>
    </div>
  );
};

export default NotFound;
