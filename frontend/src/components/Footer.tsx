import { useAuth } from "../context/useAuth";

const Footer = () => {
  const { isAuthorized } = useAuth();

  if (!isAuthorized) return null;

  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} ChatRoom. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
